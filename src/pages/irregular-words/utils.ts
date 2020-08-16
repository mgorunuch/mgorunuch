import forms from './words.json';
import {AnswerResult} from './trainer';

type FormsArray = [string, string, string];
interface JsonType {
  [key: string]: FormsArray;
}
export interface WordForm {
  word: string,
  forms: FormsArray;
}

const fm = forms as never as JsonType;

const formsFormatted: WordForm[] = [];

Object.keys(fm).forEach((title: string) => {
  formsFormatted.push({
    word: title,
    forms: fm[title],
  })
});

export interface TrainStatusMap {
  [key: string]: boolean[];
}

export const getTrainStatuses = (): TrainStatusMap => {
  let val = localStorage.getItem('train-statuses');
  let parsed: TrainStatusMap;
  if (val) {
    parsed = JSON.parse(val);
  } else {
    parsed = {};
  }

  formsFormatted.forEach(form => {
    if (!parsed[form.forms[0]]) {
      parsed[form.forms[0]] = [];
    }
  });

  return parsed;
};

export const mergeTrainStatusesWithAnswers = (answers: AnswerResult[]) => {
  const statuses = getTrainStatuses();

  const pushToStatus = (answer: AnswerResult, newValue: boolean) => {
    statuses[answer.word.forms[0]].unshift(newValue);
    if (statuses[answer.word.forms[0]].length > 3) {
      statuses[answer.word.forms[0]] = statuses[answer.word.forms[0]].slice(0, 3)
    }
  };

  answers.forEach(answer => {
    const hintUsed = answer.usedHints.some(v => v);
    if (hintUsed) {
      pushToStatus(answer, false);
      return;
    }

    const hasWrong = answer.answers.map((ans, idx) => answer.word.forms[idx] !== ans).some(v => v);
    if (hasWrong) {
      pushToStatus(answer, false);
      return;
    }

    pushToStatus(answer, true);
  });

  localStorage.setItem('train-statuses', JSON.stringify(statuses));
};

export {
  formsFormatted,
}
