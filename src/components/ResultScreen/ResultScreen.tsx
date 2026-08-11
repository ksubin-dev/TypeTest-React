import type { Result } from "../../types/financeTest";
import "./ResultScreen.css";

type ResultScreenProps = {
  result: Result;
  onRestart: () => void;
};

function ResultScreen({ result, onRestart }: ResultScreenProps) {
  return (
    <main className="result-screen">
      <section className="result-screen__card">
        <p className="result-screen__eyebrow">금융 테스트 결과</p>
        <h1 className="result-screen__title">나의 결과</h1>
        <p className="result-screen__result">{result.text}</p>
        <button
          className="result-screen__button"
          type="button"
          onClick={onRestart}
        >
          다시 테스트하기
        </button>
      </section>
    </main>
  );
}

export default ResultScreen;
