export type ResultId = 1 | 2 | 3;

export type ScoreMap = Partial<Record<ResultId, number>>;

export type Answer = {
  text: string;
  scores: ScoreMap;
};

export type Question = {
  id: number;
  text: string;
  answers: Answer[];
};

export type Result = {
  id: ResultId;
  text: string;
};

export type FinanceTest = {
  id: "banking";
  title: string;
  questions: Question[];
  results: Result[];
};
