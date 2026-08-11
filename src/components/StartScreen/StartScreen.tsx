import "./StartScreen.css";

type StartScreenProps = {
  title: string;
  description: string;
  questionCount: number;
  onStart: () => void;
};

function StartScreen({
  title,
  description,
  questionCount,
  onStart,
}: StartScreenProps) {
  return (
    <main className="start-screen">
      <section className="start-screen__card">
        <p className="start-screen__eyebrow">금융 유형 테스트</p>
        <h1 className="start-screen__title">{title}</h1>
        <p className="start-screen__description">{description}</p>
        <p className="start-screen__question-count">{questionCount}개의 질문</p>
        <button
          className="start-screen__button"
          type="button"
          onClick={onStart}
        >
          테스트 시작하기
        </button>
      </section>
    </main>
  );
}

export default StartScreen;
