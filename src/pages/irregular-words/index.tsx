import React from 'react';
import WelcomeScreen from "./welcome-screen"
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import {WordForm} from './utils';
import ChooseWords from './choose-words';
import Trainer, {AnswerResult} from './trainer';
import Results from './results';
import './index.scss';

enum ScreenType {
  Welcome,
  ChooseWords,
  Train,
  Results,
}

type Props = WithBemProps;
interface State {
  screen: ScreenType;
  selectedWords: WordForm[];
  answers: AnswerResult[],
}

class IrregularWords extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      screen: ScreenType.Welcome,
      selectedWords: [],
      answers: [],
    };
  }

  onWelcomeAnimationCompleted = () => {
    this.setState({
      screen: ScreenType.ChooseWords,
    });
  };

  selectWords = (selectedWords: WordForm[]) => {
    this.setState({
      selectedWords,
      screen: ScreenType.Train,
    })
  };

  onTrainerCompleted = (answers: AnswerResult[]) => {
    this.setState({
      answers,
      screen: ScreenType.Results,
    })
  };

  render() {
    const {
      bem,
    } = this.props;
    const {
      screen,
      selectedWords,
      answers,
    } = this.state;

    const welcomeMods = screen !== ScreenType.Welcome ? 'header' : undefined;

    return (
      <div className={bem.block()}>
        <WelcomeScreen className={bem.element('welcome-element', welcomeMods)} onAnimationCompleted={this.onWelcomeAnimationCompleted} />
        { screen === ScreenType.ChooseWords && <ChooseWords onWordsSelected={this.selectWords} /> }
        { screen === ScreenType.Train && <Trainer onTrainCompleted={this.onTrainerCompleted} words={selectedWords} /> }
        { screen === ScreenType.Results && <Results answers={answers} /> }
      </div>
    )
  }
}

export default withThemedBem('irregular-words')(IrregularWords);
