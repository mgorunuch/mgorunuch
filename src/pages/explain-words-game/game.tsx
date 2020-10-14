import React from 'react';
import './game.scss';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import {ExplainEnglishWord} from './types';


interface ComponentProps {
  selectedWords: ExplainEnglishWord[],
  onBackClicked: () => void;
}

type Props = WithBemProps & ComponentProps;

interface State {
  currentWord: number,
}

class MainGameScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentWord: 0,
    };
  }

  incrementWord = (n: number) => {
    this.setState(state => ({
      ...state,
      currentWord: state.currentWord + n,
    }));
  };

  render() {
    const {
      bem,
      selectedWords,
      onBackClicked,
    } = this.props;
    const {
      currentWord,
    } = this.state;

    const word = selectedWords[currentWord];

    const $subWords = word.forbidden_words.map(w => (
      <div className={bem.element('sub-word')}>{w}</div>
    ));

    const $goBackButton = (
      <button className={bem.element('back-button')}
              onClick={onBackClicked}>go back</button>
    );

    const hasNextWord = currentWord < selectedWords.length - 1;
    const hasPrevWord = currentWord > 0;

    return (
      <div className={bem.block()}>
        {$goBackButton}
        <div className={bem.element('main-word-title')}>Explain the word</div>
        <div className={bem.element('main-word')}>{word.main_word}</div>
        <div className={bem.element('sub-words-title')}>with no usage of the next words</div>
        <div className={bem.element('sub-words')}>{$subWords}</div>

        <div className={bem.element('buttons-container')}>
          { hasPrevWord && <button className={bem.element(['button', 'prev-word'])}
                  onClick={() => this.incrementWord(-1)}>⬅️Prev word</button> }
          { hasNextWord && <button className={bem.element(['button', 'next-word'])}
                   onClick={() => this.incrementWord(1)}>Next word ➡️</button> }
        </div>

        {$goBackButton}
      </div>
    );
  }
}

export default withThemedBem('explain-words-game')(MainGameScreen);
