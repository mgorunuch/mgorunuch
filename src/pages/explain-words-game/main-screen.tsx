import React from 'react';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import {ExplainEnglishWord} from './types';
import './main-screen.scss';


interface ComponentProps {
  selectedWords: ExplainEnglishWord[];
  onChangeWordsClicked: () => void;
  onStartClicked: () => void;
}

type Props = ComponentProps & WithBemProps;

const getSelectedWordsText = (selectedWords: ExplainEnglishWord[]): string => {
  if (selectedWords.length === 0) {
    return 'no words selected';
  }

  const visibleWords = selectedWords.slice(0, 15);
  const leftWords = selectedWords.length - visibleWords.length;

  let text = visibleWords.map(w => w.main_word).join(', ');
  if (leftWords > 0) {
    text += ` and ${leftWords} more`;
  }

  return text;
};

class MainScreen extends React.PureComponent<Props> {
  render() {
    const {
      bem,
      selectedWords,
      onChangeWordsClicked,
      onStartClicked,
    } = this.props;

    const selectedWordsText = getSelectedWordsText(selectedWords);
    const canStartGame = selectedWords.length !== 0;

    return (
      <div className={bem.block()}>
        <h1>EXPLAIN ENGLISH WORDS GAME</h1>
        <div className={bem.element('selected-words-block')}>
          {selectedWordsText}
        </div>
        <div className={bem.element('functional-block')}>
          <button className={bem.element('functional-button')}
                  onClick={onChangeWordsClicked}>🖊️ Change selected words</button>
          <button className={bem.element('functional-button', canStartGame ? undefined : 'disabled')}
                  disabled={!canStartGame}
                  onClick={onStartClicked}>🚀 Start game</button>
        </div>
      </div>
    );
  }
}

export default withThemedBem('english-explain-main-screen')(MainScreen);
