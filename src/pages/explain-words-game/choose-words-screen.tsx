import React from 'react';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import {ExplainEnglishWord} from './types';
import {Bem} from '@igor-gerasimovich/bem-helper';
import './choose-words-screen.scss';

interface WordButtonProps {
  bem: Bem;
  wordName: string;
  isSelected: boolean;

  onWordClicked: () => void;
}

const WordButton = (props: WordButtonProps) => {
  const {
    bem,
    isSelected,
    wordName,
    onWordClicked,
  } = props;

  return (
    <button className={bem.element('word', isSelected ? 'selected' : undefined)}
            onClick={onWordClicked}>
      {wordName}
    </button>
  )
};


interface ComponentProps {
  allWords: ExplainEnglishWord[];
  selectedWords: ExplainEnglishWord[];

  onWordsSelected: (words: ExplainEnglishWord[]) => void;
  onGoBackClicked: () => void;
}

type Props = ComponentProps & WithBemProps;

class ChooseWordsScreen extends React.PureComponent<Props> {
  selectAllWords = () => {
    const {
      allWords,
      onWordsSelected,
    } = this.props;

    onWordsSelected(allWords.slice());
  }

  deselectAllWords = () => {
    const {
      onWordsSelected,
    } = this.props;

    onWordsSelected([]);
  }

  selectWord = (word: ExplainEnglishWord) => {
    const {
      selectedWords,
      onWordsSelected,
    } = this.props;

    onWordsSelected([...selectedWords, word]);
  }

  deselectWord = (word: ExplainEnglishWord) => {
    const {
      selectedWords,
      onWordsSelected,
    } = this.props;

    onWordsSelected(selectedWords.filter(w => w.main_word !== word.main_word));
  }

  render() {
    const {
      bem,
      allWords,
      selectedWords,
      onGoBackClicked,
    } = this.props;

    const selectedWordsMapping: {[key: string]: boolean} = {};
    selectedWords.forEach((word: ExplainEnglishWord) => {
      selectedWordsMapping[word.main_word] = true;
    });

    const $goBackBlock = (
      <div className={bem.element('go-back-block')}>
        <button onClick={onGoBackClicked}
                className={bem.element('go-back-button')}>Go back</button>
      </div>
    )

    const $words = allWords.map((word: ExplainEnglishWord) => {
      const isSelected = selectedWordsMapping[word.main_word];

      return (
        <WordButton bem={bem}
                    onWordClicked={() => isSelected ? this.deselectWord(word) : this.selectWord(word)}
                    isSelected={isSelected}
                    wordName={word.main_word}
                    key={word.main_word} />
      );
    });

    return (
      <div className={bem.block()}>
        {$goBackBlock}

        <h1>Choose which words will be used for learning</h1>
        <div className={bem.element('functional-block')}>
          <button className={bem.element('functional-button')} onClick={() => this.selectAllWords()}>Select all</button>
          <button className={bem.element('functional-button')} onClick={() => this.deselectAllWords()}>Deselect all</button>
        </div>
        <div className={bem.element('words-container')}>
          {$words}
        </div>

        {$goBackBlock}
      </div>
    );
  }
}

export default withThemedBem('choose-words-screen')(ChooseWordsScreen);
