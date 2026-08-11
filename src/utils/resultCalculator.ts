import type { Answer, Result, ResultId } from "../types/financeTest";

const DEFAULT_RESULT_ID: ResultId = 3;

export function calculateResult(
  selectedAnswers: Answer[],
  results: Result[],
): Result {
  const defaultResult =
    results.find((result) => result.id === DEFAULT_RESULT_ID) ?? results[0];
  const scores = new Map<ResultId, number>();

  results.forEach((result) => {
    scores.set(result.id, 0);
  });

  selectedAnswers.forEach((answer) => {
    Object.entries(answer.scores).forEach(([resultId, score]) => {
      const id = Number(resultId) as ResultId;

      if (!scores.has(id) || score === undefined) {
        return;
      }

      scores.set(id, (scores.get(id) ?? 0) + score);
    });
  });

  let selectedResult = defaultResult;
  let highestScore = 0;

  results.forEach((result) => {
    const score = scores.get(result.id) ?? 0;

    if (score > highestScore) {
      highestScore = score;
      selectedResult = result;
    }
  });

  if (highestScore === 0) {
    return defaultResult;
  }

  return selectedResult;
}
