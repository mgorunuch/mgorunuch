export interface ExplainEnglishWord {
  main_word: string;
  forbidden_words: string[];
}

export enum ExplainWordsScreen {
  Main,
  ChooseWords,
  Game,
}
