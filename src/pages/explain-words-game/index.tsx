import React from 'react';
import {ExplainEnglishWord, ExplainWordsScreen} from './types';
import lb from './library.json';
import './index.scss';
import ChooseWordsScreen from './choose-words-screen';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import MainScreen from './main-screen';
import MainGameScreen from './game';

function shuffle(arr: ExplainEnglishWord[]) {
  arr.sort(() => Math.random() - 0.5);
}


type Props = WithBemProps;

interface State {
  library: ExplainEnglishWord[];
  allowedLibrary: ExplainEnglishWord[];
  currentScreen: ExplainWordsScreen;
}

class ExplainWordsGame extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      library: lb as ExplainEnglishWord[],
      allowedLibrary: lb as ExplainEnglishWord[],
      currentScreen: ExplainWordsScreen.Main,
    };
  }

  startGame = () => {
    this.setState((state) => {
      const newLib = [...state.allowedLibrary];
      shuffle(newLib);

      return {
        ...state,
        allowedLibrary: newLib,
        currentScreen: ExplainWordsScreen.Game,
      };
    });
  };

  setCurrentScreen = (newScreen: ExplainWordsScreen) => {
    this.setState({
      currentScreen: newScreen,
    })
  };

  onWordsSelected = (words: ExplainEnglishWord[]) => {
    this.setState({
      allowedLibrary: words,
    });
  };

  render() {
    const {
      bem,
    } = this.props;
    const {
      allowedLibrary,
      library,
      currentScreen,
    } = this.state;

    return (
      <div className={bem.block()}>
        {
          currentScreen === ExplainWordsScreen.Main &&
          <MainScreen onChangeWordsClicked={() => this.setCurrentScreen(ExplainWordsScreen.ChooseWords)}
                      selectedWords={allowedLibrary}
                      onStartClicked={this.startGame} />
        }
        {
          currentScreen === ExplainWordsScreen.ChooseWords &&
          <ChooseWordsScreen onWordsSelected={this.onWordsSelected}
                             onGoBackClicked={() => this.setCurrentScreen(ExplainWordsScreen.Main)}
                             allWords={library}
                             selectedWords={allowedLibrary} />
        }
        {
          currentScreen === ExplainWordsScreen.Game &&
          <MainGameScreen onBackClicked={() => this.setCurrentScreen(ExplainWordsScreen.Main)}
                          selectedWords={allowedLibrary} />
        }
      </div>
    );
  }
}

export default withThemedBem('explain-english-words')(ExplainWordsGame);
