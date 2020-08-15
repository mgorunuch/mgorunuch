import React from 'react';
import {WordForm, formsFormatted} from './utils';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import './choose-words.scss';
import {Bem} from '@igor-gerasimovich/bem-helper';

const prevUsageSelectedKey = 'irreg-prev-usage-words';

interface ComponentProps {
  onWordsSelected: (selectedWords: WordForm[]) => void;
}
type Props = ComponentProps & WithBemProps;

const Word: React.ComponentType<{ className: string, onClick: () => void }> = (props) => {
  return (
    <button type="button" onClick={props.onClick} className={props.className}>{props.children}</button>
  );
};

interface WFMProps {
  bem: Bem;
  className?: string;
  blockTitle: string;
  onClick: (form: WordForm) => void;
  words: WordForm[];
}
const WordFormsBlock: React.ComponentType<WFMProps> = (props) => {
  const {
    onClick,
    bem,
    words,
    className,
    blockTitle,
  } = props;

  const $words = words.map((word) => {
    return (
      <Word key={word.word} className={bem.element('word')} onClick={() => onClick(word)}>{word.word}</Word>
    )
  })

  const classNames = [bem.element('block')];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')}>
      <div className={bem.element('block-header')}>
        <div className={bem.element('block-title')}>{blockTitle}</div>
      </div>
      <div className={bem.element('block-content')}>
        {$words.length ? $words : <span className={bem.element('block-nothing')}>Nothing... 😬</span>}
      </div>
    </div>
  );
};

interface State {
  selected: WordForm[];
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

  render() {
    const {
      bem,
    } = this.props;
    const {
      selected,
    } = this.state;

    const map: {[key: string]: boolean} = {};
    selected.forEach(item => {map[item.word] = true})

    const availableWords = formsFormatted.filter(item => !map[item.word]);

    return (
      <div className={bem.block()}>
        <WordFormsBlock onClick={this.onFormClicked} bem={bem} blockTitle="👌 Selected" words={selected} className={bem.element('block-selected')}/>
        <WordFormsBlock onClick={this.onFormClicked} bem={bem} blockTitle="💡 Available" words={availableWords}/>
        <div className={bem.element('block-footer')}>
          {
            selected.length > 1
              ? <button type="button" onClick={this.closeForm} className={bem.element('continue-button')}>Lets start  🚀</button>
              : <span>Select at least 2 words</span>
          }
        </div>
      </div>
    );
  }
}

export default withThemedBem('choose-words')(ChooseWords);
