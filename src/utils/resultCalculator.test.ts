import { describe, expect, it } from "vitest";
import type { Answer, Result, ScoreMap } from "../types/financeTest";
import { calculateResult } from "./resultCalculator";

const results: Result[] = [
  { id: 1, text: "결과 1" },
  { id: 2, text: "결과 2" },
  { id: 3, text: "결과 3" },
];

function createAnswer(scores: ScoreMap): Answer {
  return {
    text: "테스트 선택지",
    scores,
  };
}

describe("calculateResult", () => {
  it("1번 결과 점수가 가장 높으면 1번 결과를 반환한다", () => {
    const selectedAnswers = [createAnswer({ 1: 1 })];

    const result = calculateResult(selectedAnswers, results);

    expect(result.id).toBe(1);
  });

  it("2번 결과 점수가 가장 높으면 2번 결과를 반환한다", () => {
    const selectedAnswers = [createAnswer({ 2: 1 })];

    const result = calculateResult(selectedAnswers, results);

    expect(result.id).toBe(2);
  });

  it("3번 결과 점수가 가장 높으면 3번 결과를 반환한다", () => {
    const selectedAnswers = [createAnswer({ 3: 1 })];

    const result = calculateResult(selectedAnswers, results);

    expect(result.id).toBe(3);
  });

  it("여러 답변의 같은 결과 점수를 누적한다", () => {
    const selectedAnswers = [
      createAnswer({ 2: 1 }),
      createAnswer({ 2: 1 }),
      createAnswer({ 1: 1 }),
    ];

    const result = calculateResult(selectedAnswers, results);

    expect(result.id).toBe(2);
  });

  it("최고 점수가 동점이면 먼저 정의된 결과를 반환한다", () => {
    const selectedAnswers = [createAnswer({ 1: 1 }), createAnswer({ 2: 1 })];

    const result = calculateResult(selectedAnswers, results);

    expect(result.id).toBe(1);
  });

  it("선택한 답변이 없으면 기본 결과인 3번 결과를 반환한다", () => {
    const selectedAnswers: Answer[] = [];

    const result = calculateResult(selectedAnswers, results);

    expect(result.id).toBe(3);
  });

  it("유효한 점수가 없으면 기본 결과인 3번 결과를 반환한다", () => {
    const selectedAnswers = [createAnswer({})];

    const result = calculateResult(selectedAnswers, results);

    expect(result.id).toBe(3);
  });

  it("모든 점수가 0이면 기본 결과인 3번 결과를 반환한다", () => {
    const selectedAnswers = [createAnswer({ 1: 0, 2: 0, 3: 0 })];

    const result = calculateResult(selectedAnswers, results);

    expect(result.id).toBe(3);
  });
});
