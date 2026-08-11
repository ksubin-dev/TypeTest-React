import StartScreen from "./components/StartScreen/StartScreen";
import { financeTest } from "./data/financeTest";

function App() {
  const description = "나의 금융 성향을 알아보세요.";

  function handleStart() {
    console.info("금융 테스트 시작 버튼이 클릭되었습니다.");
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
