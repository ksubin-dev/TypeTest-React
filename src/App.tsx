import { useState } from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import QuizScreen from "./components/QuizScreen/QuizScreen";
import ResultScreen from "./components/ResultScreen/ResultScreen";
import { financeTest } from "./data/financeTest";
import type { Answer } from "./types/financeTest";
import { calculateResult } from "./utils/resultCalculator";

type Screen = "start" | "quiz" | "result";

function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);

  const description = "나의 금융 성향을 알아보세요.";
  const totalQuestions = financeTest.questions.length;
  const currentQuestion = financeTest.questions[currentQuestionIndex];

  function handleStart() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScreen("quiz");
  }

  function handleAnswerSelect(answer: Answer) {
    const nextSelectedAnswers = [...selectedAnswers, answer];
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    setSelectedAnswers(nextSelectedAnswers);

    if (isLastQuestion) {
      setScreen("result");
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
  }

  function handleRestart() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScreen("start");
  }

  if (screen === "result") {
    const result = calculateResult(selectedAnswers, financeTest.results);

    return <ResultScreen result={result} onRestart={handleRestart} />;
  }

  if (screen === "quiz" && currentQuestion) {
    return (
      <QuizScreen
        question={currentQuestion}
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        onAnswerSelect={handleAnswerSelect}
      />
    );
  }

  return (
    <StartScreen
      title={financeTest.title}
      description={description}
      questionCount={financeTest.questions.length}
      onStart={handleStart}
    />
  );
}

export default App;
