import forms from './words.json';

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
})

export {
  formsFormatted,
}
