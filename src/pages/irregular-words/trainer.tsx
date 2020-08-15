import React from 'react';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import {WordForm} from './utils';
import {Bem} from '@igor-gerasimovich/bem-helper';
import './trainer.scss';

export interface AnswerResult {
  answerFormIdx: number;
  word: WordForm,
  answers: [string, string, string],
  usedHints: [boolean, boolean, boolean],
  isValid: [boolean, boolean, boolean],
}

interface BlockProps {
  title: string;
  bem: Bem,
}
const Block: React.ComponentType<BlockProps> = (props) => {
  const {
    bem,
    title,
    children,
  } = props;

  return (
    <div className={bem.element('block')}>
      <div className={bem.element('block-title')}>{title}</div>
      <div className={bem.element('block-content')}>{children}</div>
    </div>
  )
};

interface ComponentProps {
  words: WordForm[];
  onTrainCompleted: (results: AnswerResult[]) => void;
}
type Props = WithBemProps & ComponentProps;

interface State {
  questions: AnswerResult[];
  answeredQuestions: AnswerResult[];
  answ1val: string;
  answ1check: boolean;
  answ2val: string;
  answ2check: boolean;
  answ3val: string;
  answ3check: boolean;
}

class Trainer extends React.Component<Props, State> {
  answ1: React.RefObject<HTMLInputElement> = React.createRef();
  answ2: React.RefObject<HTMLInputElement> = React.createRef();
  answ3: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: Props) {
    super(props);

    const {
      words,
    } = props;

    this.state = {
      answeredQuestions: [],
      questions: this.prepareQuestions(words),
      answ1val: '',
      answ1check: false,
      answ2val: '',
      answ2check: false,
      answ3val: '',
      answ3check: false,
    }
  }

  prepareQuestions = (words: WordForm[]): AnswerResult[] => {
    return words.map(item => ({
      answerFormIdx: 0,
      answers: ['', '', ''],
      isValid: [false, false, false],
      usedHints: [false, false, false],
      word: item,
    }));
  };

  onAnswerChanged = (valIDX: 1 | 2 | 3) => {
    switch (valIDX) {
      case 1:
        if (this.answ1.current) {
          this.setState({
            answ1val: this.answ1.current.value,
            answ1check: false,
          })
        }
        break;
      case 2:
        if (this.answ2.current) {
          this.setState({
            answ2val: this.answ2.current.value,
            answ2check: false,
          })
        }
        break;
      case 3:
        if (this.answ3.current) {
          this.setState({
            answ3val: this.answ3.current.value,
            answ3check: false,
          })
        }
        break;
    }
  };

  hintAnswer = (valIDX: 1 | 2 | 3) => {
    const {questions} = this.state;
    const q = questions.slice().shift();
    if (!q) {
      return;
    }

    switch (valIDX) {
      case 1:
        if (this.answ1.current) {
          q.usedHints[0] = true;
          questions[0] = q;

          this.setState({
            answ1val: q.word.forms[0],
            answ1check: false,
            questions,
          })
        }
        break;
      case 2:
        if (this.answ2.current) {
          q.usedHints[1] = true;
          questions[0] = q;

          this.setState({
            answ2val: q.word.forms[1],
            answ2check: false,
            questions,
          })
        }
        break;
      case 3:
        if (this.answ3.current) {
          q.usedHints[2] = true;
          questions[0] = q;

          this.setState({
            answ3val: q.word.forms[2],
            answ3check: false,
            questions,
          })
        }
        break;
    }
  };

  checkAnswers = (validIDX: Array<1 | 2 | 3>) => {
    this.setState((state) => {
      const {questions} = state;

      const q = questions.slice().shift();
      if (!q) {
        return null;
      }

      const has1 = validIDX.includes(1);
      const has2 = validIDX.includes(2);
      const has3 = validIDX.includes(3);

      if (has1 && this.answ1.current) {
        q.answers[0] = this.answ1.current.value;
      }

      if (has2 && this.answ2.current) {
        q.answers[1] = this.answ2.current.value;
      }

      if (has3 && this.answ3.current) {
        q.answers[2] = this.answ3.current.value;
      }

      return {
        answ1check: has1 ? true : state.answ1check,
        answ2check: has2 ? true : state.answ2check,
        answ3check: has3 ? true : state.answ3check,
        questions: [
          q,
          ...questions.slice(1),
        ],
      };
    });
  };

  continue = () => {
    const {
      questions,
      answeredQuestions,
    } = this.state;
    const {
      onTrainCompleted,
    } = this.props;

    const newQues = questions.slice();
    const newAnsQues = answeredQuestions.slice();
    const q = newQues.shift();

    if (!q) {
      onTrainCompleted(answeredQuestions);
      return;
    }

    newAnsQues.push(q);

    this.setState({
      questions: newQues,
      answeredQuestions: newAnsQues,
      answ2check: false,
      answ1check: false,
      answ3check: false,
      answ3val: '',
      answ2val: '',
      answ1val: '',
    });

    if (newQues.length < 1) {
      onTrainCompleted(newAnsQues);
      return;
    }
  };

  render() {
    const {
      bem,
    } = this.props;
    const {
      questions,
      answ1val,
      answ1check,
      answ2val,
      answ2check,
      answ3val,
      answ3check,
    } = this.state;

    if (questions.length < 1) {
      return null;
    }

    const q = questions[0];

    const isAnsw1HasValue = answ1val !== '';
    const isAnsw1Valid = answ1val === q.word.forms[0];
    const answ1mods = answ1check ? isAnsw1Valid ? 'valid' : 'invalid' : undefined;

    const isAnsw2Valid = answ2val === q.word.forms[1];
    const isAnsw2HasValue = answ2val !== '';
    const answ2mods = answ2check ? isAnsw2Valid ? 'valid' : 'invalid' : undefined;

    const isAnsw3HasValue = answ3val !== '';
    const isAnsw3Valid = answ3val === q.word.forms[2];
    const answ3mods = answ3check ? isAnsw3Valid ? 'valid' : 'invalid' : undefined;

    const allAnswered = answ1check && answ2check && answ3check;
    const allHasValue = isAnsw1HasValue && isAnsw2HasValue && isAnsw3HasValue;

    return (
      <div className={bem.block()}>
        <Block bem={bem} title="Word">
          <span className={bem.element('learn-word')}>{q.word.forms[q.answerFormIdx]}</span>
        </Block>
        <Block title="Progress" bem={bem}>
          {`left ${questions.length} words`}
        </Block>
        <Block bem={bem} title="Answer forms">
          <div className={bem.element('answer-blocks')}>
            <div className={bem.element('answer')}>
              <input placeholder="enter valid form" onChange={() => this.onAnswerChanged(1)} value={answ1val} className={bem.element('answer-field', answ1mods)} type="text" ref={this.answ1} />
              { isAnsw1HasValue && !answ1check && <button type="button" onClick={() => this.checkAnswers([1])} className={bem.element('hint-button')}>Check 💡</button>}
              { answ1check && !isAnsw1Valid && <button type="button" onClick={() => this.hintAnswer(1)} className={bem.element('hint-button')}>Hint 💡</button>}
            </div>
            <div className={bem.element('answer')}>
              <input placeholder="enter valid form" onChange={() => this.onAnswerChanged(2)} value={answ2val} className={bem.element('answer-field', answ2mods)} type="text" ref={this.answ2} />
              { isAnsw2HasValue && !answ2check && <button type="button" onClick={() => this.checkAnswers([2])} className={bem.element('hint-button')}>Check 💡</button>}
              { answ2check && !isAnsw2Valid && <button type="button" onClick={() => this.hintAnswer(2)} className={bem.element('hint-button')}>Hint 💡</button>}
            </div>
            <div className={bem.element('answer')}>
              <input placeholder="enter valid form" onChange={() => this.onAnswerChanged(3)} value={answ3val} className={bem.element('answer-field', answ3mods)} type="text" ref={this.answ3} />
              { isAnsw3HasValue && !answ3check && <button type="button" onClick={() => this.checkAnswers([3])} className={bem.element('hint-button')}>Check 💡</button>}
              { answ3check && !isAnsw3Valid && <button type="button" onClick={() => this.hintAnswer(3)} className={bem.element('hint-button')}>Hint 💡</button>}
            </div>
          </div>
        </Block>
        <Block title="Actions" bem={bem}>
          {!allHasValue && <div>First of all you need to answer...</div>}
          {
            allHasValue &&
            <>
              {!allAnswered && <button type="button" onClick={() => this.checkAnswers([1,2,3])} className={bem.element('hint-button')}>Check all 💡</button>}
              {allAnswered && <button type="button" onClick={() => this.continue()} className={bem.element('hint-button')}>Continue ⏭</button>}
            </>
          }
        </Block>
      </div>
    )
  }
}

export default withThemedBem('irregular-trainer')(Trainer);
