import type { Answer, Question } from "../../types/financeTest";
import "./QuizScreen.css";

type QuizScreenProps = {
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  onAnswerSelect: (answer: Answer) => void;
};

function QuizScreen({
  question,
  currentQuestionNumber,
  totalQuestions,
  onAnswerSelect,
}: QuizScreenProps) {
  const progressPercent = (currentQuestionNumber / totalQuestions) * 100;

  return (
    <main className="quiz-screen">
      <section className="quiz-screen__card">
        <p className="quiz-screen__eyebrow">금융 테스트</p>

        <div className="quiz-screen__progress-header">
          <span>
            {currentQuestionNumber} / {totalQuestions}
          </span>
        </div>

        <div className="quiz-screen__progress" aria-hidden="true">
          <div
            className="quiz-screen__progress-value"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <h1 className="quiz-screen__question">{question.text}</h1>

        <div className="quiz-screen__answers">
          {question.answers.map((answer, index) => (
            <button
              className="quiz-screen__answer-button"
              key={`${question.id}-${index}`}
              type="button"
              onClick={() => onAnswerSelect(answer)}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default QuizScreen;
