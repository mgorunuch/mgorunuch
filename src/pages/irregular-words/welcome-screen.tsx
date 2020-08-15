import React from 'react';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import './welcome-screen.scss';

interface ComponentProps {
  className?: string;
  onAnimationCompleted: () => void;
}
type Props = ComponentProps & WithBemProps;
interface State {
  leftPartC: string,
  appNameC: string,
  rightPartC: string,
  interval?: any;
  completed: boolean;
}

const leftPart = 'Hello 👋 This is';
const appName = 'Irregular verbs trainer 🧠';
const rightPart = '...';

class WelcomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      appNameC: '',
      leftPartC: '',
      rightPartC: '',
      completed: false,
    };
  }

  componentDidMount() {
    this.initTyper();
  }

  initTyper = () => {
    const interval = setInterval(this.tickTyper, 100);

    this.setState({
      interval,
    })
  };

  tickTyper = () => {
    const { onAnimationCompleted } = this.props;

    this.setState((state: State) => {
      const {
        leftPartC,
        appNameC,
        rightPartC,
        interval,
      } = state;

      if (leftPartC !== leftPart) {
        let newLeftPart = leftPart.slice(0, leftPartC.length+1);

        return Object.assign(state, {
          leftPartC: newLeftPart
        })
      }

      if (appNameC !== appName) {
        let newAppName = appName.slice(0, appNameC.length+1);


        return Object.assign(state, {
          appNameC: newAppName
        })
      }

      if (rightPartC !== rightPart) {
        let newRightPart = rightPart.slice(0, rightPartC.length+1);

        return Object.assign(state, {
          rightPartC: newRightPart
        })
      }

      clearInterval(interval);

      this.setState({
        interval: undefined,
      });

      onAnimationCompleted();

      return Object.assign(state, {
        interval: undefined,
        completed: true,
      });
    });
  };

  render() {
    const {
      bem,
      className,
    } = this.props;
    const {
      appNameC,
      leftPartC,
      rightPartC,
      completed,
    } = this.state;

    const $appName = <span className={bem.element('app-name')}>{appNameC}</span>
    const $leftPart = <span className={bem.element('left-text')}>{leftPartC}</span>
    const $dots = <span className={bem.element('dots')}>{rightPartC}</span>

    const textContMod = completed ? undefined : 'typing';
    const isLeftPartTyping = leftPartC !== leftPart;

    return (
      <div className={[bem.block(), className].join(' ')}>
        <div className={bem.element('text-content', textContMod)}>
          <span className={bem.element('text', isLeftPartTyping ? 'without-margin' : undefined)}>{$leftPart}</span>
          <span className={bem.element('text', ['without-margin', 'main'])}>{$appName}</span>
          <span className={bem.element('text', 'without-margin')}>{$dots}</span>
          <span className={bem.element('cursor')}>|</span>
        </div>
      </div>
    )
  }
}

export default withThemedBem('irregular-welcome-screen')(WelcomeScreen);
