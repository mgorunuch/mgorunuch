import React from 'react';
import {Bem} from '@igor-gerasimovich/bem-helper';
import './english-grammar.scss';
import data from './grammar.json';

type DataRules = {
  keys_en: string[],
  keys_ru: string[],
  explain_ru: string,
  explain_en: string,
  verb: string,
  suffix: string,
  examples_en: string[],
  examples_ru: string[],
};

type DataType = {
  [key: string]: {
    types: {
      [key2: string]: DataRules,
    },
  }
}

const bem = new Bem('english-grammar-page');

const names: {[name: string]: { [name2: string]: string }} = {
  times: {
    present: 'Present',
    past: 'Past',
    future: 'Future',
  },
  types: {
    simple: 'Simple',
    continuous: 'Continuous',
    perfect: 'Perfect',
    perfectContinuous: 'Perfect Continuous',
  },
};
const timeTypes = Object.keys(names.types);

interface State {
  showVerb: boolean;
  showSuffix: boolean;
  showExplain: boolean;
  showExampleRu: boolean;
  showExampleEn: boolean;
}

type Props = {};

class EnglishGrammar extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const config = localStorage.getItem('grammar-config')
    let state = {
      showExampleEn: true,
      showExampleRu: false,
      showExplain: true,
      showSuffix: true,
      showVerb: true,
    };

    if (config) {
      const configDt = JSON.parse(config);
      state = Object.assign(state, configDt)
    }

    this.state = state;
  }

  onConfigChange = (key: keyof State, val: boolean) => {
    this.setState((st) => {
      const newSt = {
        ...st,
        [key]: val,
      };

      localStorage.setItem('grammar-config', JSON.stringify(newSt));

      return newSt;
    });
  }

  getTds(rules: { [type: string]: DataRules }, timeName: string) {
    const {
      showExampleEn,
      showExampleRu,
      showExplain,
      showSuffix,
      showVerb,
    } = this.state;

    const count = [showExampleEn, showExampleRu, showExplain, showSuffix, showVerb].reduce((p, n) => p + (n ? 1 : 0), 0);

    const types: {[key:string]: any} = {
      verb: showVerb ? timeTypes.map((timeType) => <td className={bem.element('val-val')}>{rules[timeType].verb}</td>) : undefined,
      suffix: showSuffix ? timeTypes.map((timeType) => <td className={bem.element('val-val')}>{rules[timeType].suffix}</td>) : undefined,
      explain: showExplain ? timeTypes.map((timeType) => <td className={bem.element('val-val')}>{rules[timeType].explain_ru}</td>) : undefined,
      exampleEn: showExampleEn ? timeTypes.map((timeType) => <td className={bem.element('val-val')}>{rules[timeType].examples_en.join(' ')}</td>) : undefined,
      exampleRu: showExampleRu ? timeTypes.map((timeType) => <td className={bem.element('val-val')}>{rules[timeType].examples_ru.join(' ')}</td>) : undefined,
    };

    const $rows = Object.keys(types).map(type => {
      if (!types[type]) {
        return undefined
      }

      let name = 'unknown';
      switch (type) {
        case 'verb':
          name = 'Verb';
          break;
        case 'suffix':
          name = 'Suffix';
          break;
        case 'explain':
          name = 'Explain';
          break;
        case 'exampleEn':
          name = 'Example En';
          break;
        case 'exampleRu':
          name = 'Example Ru';
          break;
      }

      return [
        <td className={bem.element('val-title')}>{name}:</td>,
        ...types[type],
      ];
    }).filter(Boolean);

    if ($rows.length === 0) {
      return undefined
    }

    return [
      <tr className={bem.element('time-first-row')}>
        <th className={bem.element('type-title')} rowSpan={count}>{names.times[timeName]}</th>
        {$rows[0]}
      </tr>,
      ...$rows.map((item, idx) => {
        if (idx === 0) {
          return undefined;
        }

        return (
          <tr>
            {item}
          </tr>
        )
      })
    ];
  }

  render() {
    const {
      showVerb,
      showSuffix,
      showExplain,
      showExampleRu,
      showExampleEn,
    } = this.state;

    const dt = (data as unknown as DataType)

    const $rows = Object.keys(data).map((timeName: string) => {
      const time = dt[timeName];

      return this.getTds(time.types, timeName);
    });

    return (
      <div className={bem.block()}>
        <div className={bem.element('header')}>English grammar helper</div>
        <div className={bem.element('config')}>
          <label htmlFor="show_verb">
            <input id="show_verb"
                   type="checkbox"
                   defaultChecked={showVerb}
                   onChange={v => this.onConfigChange('showVerb', !showVerb)}/>
            Show verb
          </label>
          <label htmlFor="show_suffix">
            <input id="show_suffix"
                   type="checkbox"
                   defaultChecked={showSuffix}
                   onChange={v => this.onConfigChange('showSuffix', !showSuffix)}/>
            Show suffix
          </label>
          <label htmlFor="show_explain">
            <input id="show_explain"
                   type="checkbox"
                   defaultChecked={showExplain}
                   onChange={v => this.onConfigChange('showExplain', !showExplain)}/>
            Show explain (ru)
          </label>
          <label htmlFor="show_example_ru">
            <input id="show_example_ru"
                   type="checkbox"
                   defaultChecked={showExampleRu}
                   onChange={v => this.onConfigChange('showExampleRu', !showExampleRu)}/>
            Show example (ru)
          </label>
          <label htmlFor="show_example_en">
            <input id="show_example_en"
                   type="checkbox"
                   defaultChecked={showExampleEn}
                   onChange={v => this.onConfigChange('showExampleEn', !showExampleEn)}/>
            Show example (en)
          </label>
        </div>
        <div className={bem.element('body')}>
          <table className={bem.element('table')} cellSpacing={0}>
            <tr>
              <td />
              <td />
              {Object.keys(data.present.types).map((timeName: string) => <th className={bem.element('type-name')}>{names.types[timeName]}</th>)}
            </tr>
            {$rows}
          </table>
        </div>
      </div>
    );
  }
}

export default EnglishGrammar;
