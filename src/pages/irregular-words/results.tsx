import React from 'react';
import {WithBemProps, withThemedBem} from '../../utils/hocks/with-bem';
import {AnswerResult} from './trainer';
import {Bem} from '@igor-gerasimovich/bem-helper';
import './results.scss';


interface AnswerFormProps {
  bem: Bem,
  enteredForm: string,
  form: string,
  withHint: boolean,
}
const AnswerForm: React.ComponentType<AnswerFormProps> = (props) => {
  const {
    bem,
    enteredForm,
    form,
    withHint,
  } = props;

  const mainElementMods = enteredForm !== form || withHint ? 'invalid' : undefined;

  if (enteredForm === form) {
    return (
      <div className={bem.element('answer-form', mainElementMods)}>
        <span className={bem.element('form')}>{form}</span> is valid {withHint && <span className={bem.element('hint')}>with hint</span>}
      </div>
    );
  }

  return (
    <div className={bem.element('answer-form', mainElementMods)}>
      <span className={bem.element('form')}>{enteredForm}</span> must be <span className={bem.element('form')}>{form}</span> {withHint && <span className={bem.element('hint')}>with hint</span>}
    </div>
  );
};

interface AnswerProps {
  bem: Bem,
  answer: AnswerResult,
}
const Answer: React.ComponentType<AnswerProps> = (props) => {
  const {
    bem,
    answer,
  } = props;

  return (
    <div className={bem.element('answer')}>
      <AnswerForm bem={bem} enteredForm={answer.answers[0]} withHint={answer.usedHints[0]} form={answer.word.forms[0]} />
      <AnswerForm bem={bem} enteredForm={answer.answers[1]} withHint={answer.usedHints[1]} form={answer.word.forms[1]} />
      <AnswerForm bem={bem} enteredForm={answer.answers[2]} withHint={answer.usedHints[2]} form={answer.word.forms[2]} />
    </div>
  );
};

interface ComponentProps {
  answers: AnswerResult[];
}
type Props = ComponentProps & WithBemProps;

class Results extends React.Component<Props, any> {
  render() {
    const {
      bem,
      answers,
    } = this.props;

    const $answers = answers.map(ans => <Answer bem={bem} answer={ans} key={ans.word.word} />)

    return (
      <div className={bem.block()}>
        {$answers}
      </div>
    )
  }
}

export default withThemedBem('irregular-results')(Results);
