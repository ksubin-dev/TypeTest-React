import { useState } from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import QuizScreen from "./components/QuizScreen/QuizScreen";
import { financeTest } from "./data/financeTest";
import type { Answer } from "./types/financeTest";

type Screen = "start" | "quiz" | "complete";

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
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    setSelectedAnswers((previousAnswers) => [...previousAnswers, answer]);

    if (isLastQuestion) {
      setScreen("complete");
      return;
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
  }

  if (screen === "complete") {
    return (
      <main>
        <h1>테스트가 완료되었습니다.</h1>
        <p>선택한 답변 {selectedAnswers.length}개가 저장되었습니다.</p>
      </main>
    );
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
