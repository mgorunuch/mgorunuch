import React from 'react';
import {WordForm, formsFormatted, TrainStatusMap, getTrainStatuses} from './utils';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import './choose-words.scss';
import {Bem} from '@igor-gerasimovich/bem-helper';

const prevUsageSelectedKey = 'irreg-prev-usage-words';

interface ComponentProps {
  onWordsSelected: (selectedWords: WordForm[]) => void;
  onTableStart: (selectedWords: WordForm[]) => void;
}
type Props = ComponentProps & WithBemProps;

const Word: React.ComponentType<{ className: string, onClick: () => void }> = (props) => {
  return (
    <button type="button" onClick={props.onClick} className={props.className}>{props.children}</button>
  );
};

const Block: React.ComponentType<{ bem: Bem, className?: string, title: string }> = (props) => {
  const {
    bem,
    children,
    className,
    title,
  } = props;

  const classNames = [bem.element('block')];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')}>
      <div className={bem.element('block-header')}>
        <div className={bem.element('block-title')}>{title}</div>
      </div>
      <div className={bem.element('block-content')}>
        {children}
      </div>
    </div>
  );
};

interface WFMProps {
  bem: Bem;
  className?: string;
  blockTitle: string;
  onClick: (form: WordForm) => void;
  words: WordForm[];
  prevResults: TrainStatusMap;
}
const WordFormsBlock: React.ComponentType<WFMProps> = (props) => {
  const {
    onClick,
    bem,
    words,
    className,
    blockTitle,
    prevResults,
  } = props;

  const $words = words.map((word) => {
    let wordMod: string | undefined = undefined;
    const hasError = prevResults[word.forms[0]].some(v => !v);
    if (hasError) {
      wordMod = 'error';
    }
    if (!hasError && prevResults[word.forms[0]].length >= 3) {
      wordMod = 'success';
    }

    return (
      <Word key={word.word} className={bem.element('word', wordMod)} onClick={() => onClick(word)}>{word.word}</Word>
    )
  })

  const classNames = [bem.element('block')];
  if (className) {
    classNames.push(className);
  }

  return (
    <Block bem={bem} className={className} title={blockTitle}>
      {$words.length ? $words : <span className={bem.element('block-nothing')}>Nothing... 😬</span>}
    </Block>
  );
};

interface State {
  selected: WordForm[];
  prevResults: TrainStatusMap;
}

class ChooseWords extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let selected = [];
    const val = localStorage.getItem(prevUsageSelectedKey)

    if (val) {
      selected = JSON.parse(val);
    }

    this.state = {
      selected,
      prevResults: getTrainStatuses(),
    }
  }

  onFormClicked = (form: WordForm) => {
    this.setState((state: State) => {
      const isSelected = state.selected.some(item => item.word === form.word);

      if (isSelected) {
        return {
          selected: state.selected.filter(item => item.word !== form.word),
        };
      }

      const newSelected = state.selected.slice();
      newSelected.push(form)

      return {
        selected: newSelected,
      }
    })
  };

  closeForm = () => {
    const {
      onWordsSelected,
    } = this.props;
    const {
      selected,
    } = this.state;

    localStorage.setItem(prevUsageSelectedKey, JSON.stringify(selected))

    onWordsSelected(selected);
  };

  goTable = () => {
    const {
      onTableStart,
    } = this.props;
    const {
      selected,
    } = this.state;

    localStorage.setItem(prevUsageSelectedKey, JSON.stringify(selected))

    onTableStart(selected);
  };

  render() {
    const {
      bem,
    } = this.props;
    const {
      selected,
      prevResults,
    } = this.state;

    const map: {[key: string]: boolean} = {};
    selected.forEach(item => {map[item.word] = true})

    const availableWords = formsFormatted.filter(item => !map[item.word]);

    return (
      <div className={bem.block()}>
        <div className={bem.element(['block-notes', 'block'])}>
          <div>This app used in browser memory. I am recommend you to use one browser every time you trained or install website as application to store your results.</div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div className={bem.element('note-word')}><Word className={bem.element('word')} onClick={() => undefined}>be</Word> - you not trained 3+ times</div>
            <div className={bem.element('note-word')}><Word className={bem.element('word', 'success')} onClick={() => undefined}>be</Word> - you made no mistakes past 3 word train</div>
            <div className={bem.element('note-word')}><Word className={bem.element('word', 'error')} onClick={() => undefined}>be</Word> - you made at least 1 mistake in past 3 word train</div>
          </div>
        </div>
        <WordFormsBlock prevResults={prevResults} onClick={this.onFormClicked} bem={bem} blockTitle="👌 Selected" words={selected} className={bem.element('block-selected')}/>
        <WordFormsBlock prevResults={prevResults} onClick={this.onFormClicked} bem={bem} blockTitle="💡 Available" words={availableWords}/>
        <Block bem={bem} title="Info">
          Here you can show table for selected words...
          <br/>
          <br/>
          <button type="button" onClick={this.goTable} className={bem.element('continue-button')}>Show table 🍬</button>
        </Block>
        <Block bem={bem} title="Trainer">
          Here you can train/check your knowledge...
          <br/>
          <br/>
          {
            selected.length > 1
              ? <button type="button" onClick={this.closeForm} className={bem.element('continue-button')}>Start train 🚀</button>
              : <span>Select at least 2 words</span>
          }
        </Block>
      </div>
    );
  }
}

export default withThemedBem('choose-words')(ChooseWords);
