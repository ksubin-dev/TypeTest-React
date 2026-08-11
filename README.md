# TypeTest React

기존 Android 유형 테스트의 금융 테스트 1개를 React + TypeScript로 다시 구현한 Web POC입니다.

Android Compose에서 경험한 선언형 UI, State 기반 화면 구성, 데이터와 UI 분리, 이벤트 전달 방식을 React에서는 어떻게 구성하는지 비교하며 구현했습니다.

## 프로젝트 소개

이 프로젝트는 기존 Android 유형 테스트 전체를 React로 마이그레이션한 프로젝트가 아닙니다. 기존 프로젝트에 있던 금융 테스트 1개를 기준으로 React Web 환경에서 같은 테스트 흐름을 다시 구성한 POC입니다.

기존 Android 프로젝트는 다음 흐름으로 개선되었습니다.

```text
V1  Java + XML + Activity 기반
V2  다수 Activity 구조를 Host Activity + Fragment 구조로 개선
V3  금융 테스트 1개를 Kotlin + Jetpack Compose로 재구현
React POC  V3 금융 테스트를 React + TypeScript로 다시 구현
```

## 주요 화면

### Mobile

<table>
  <tr>
    <th>Start</th>
    <th>Quiz</th>
    <th>Result</th>
  </tr>
  <tr>
    <td><img width="240" alt="Mobile StartScreen" src="https://github.com/user-attachments/assets/acc9686d-3ae8-47ad-80e6-bbf5a48e7b48" /></td>
    <td><img width="240" alt="Mobile QuizScreen" src="https://github.com/user-attachments/assets/5fc877d7-5e19-44f6-9ada-d1c6b2ca16c7" /></td>
    <td><img width="240" alt="Mobile ResultScreen" src="https://github.com/user-attachments/assets/a687c0dd-6bdd-4439-b237-d2d3779cc662" /></td>
  </tr>
</table>

### Desktop

<p align="center">
  <img width="740" alt="Desktop QuizScreen" src="https://github.com/user-attachments/assets/7a29ae9c-ed16-4574-9c14-697f6cddcb49" />
</p>

## 구현 범위 & Tech Stack

현재 React POC에서 구현한 범위입니다.

- 금융 테스트 1개
- 질문 6개, 각 질문 선택지 3개
- 결과 3개
- `StartScreen -> QuizScreen -> ResultScreen -> Restart` 흐름
- 모바일 / 데스크톱 반응형 UI
- 결과 계산 로직 단위 테스트
- Pull Request 단계 GitHub Actions CI

실제로 사용한 기술입니다.

| 기술               | 사용 목적                                                |
| ------------------ | -------------------------------------------------------- |
| React / TypeScript | Component와 State 기반 UI 구현, 데이터와 Props 구조 정의 |
| Vite               | React + TypeScript 개발 환경 구성                        |
| CSS                | 화면별 카드형 UI와 반응형 스타일 작성                    |
| ESLint / Prettier  | 코드 품질 확인과 포맷 정리                               |
| Vitest             | 결과 계산 로직 단위 테스트                               |
| GitHub Actions     | PR 단계 lint / test / build 자동 검증                    |

## 프로젝트 구조

```text
src/
├─ components/
│  ├─ StartScreen/
│  ├─ QuizScreen/
│  └─ ResultScreen/
├─ data/
│  └─ financeTest.ts
├─ types/
│  └─ financeTest.ts
├─ utils/
│  ├─ resultCalculator.ts
│  └─ resultCalculator.test.ts
└─ App.tsx

.github/
└─ workflows/
   └─ ci.yml
```

각 영역은 다음 역할만 단순하게 나누었습니다.

- `data`: 금융 테스트 질문 / 선택지 / 결과 데이터
- `types`: 금융 테스트 데이터와 Component Props에서 사용하는 TypeScript 타입
- `components`: 화면 UI와 사용자 이벤트 전달
- `utils`: 결과 계산 로직과 단위 테스트
- `App`: 화면 흐름과 State 관리

## 상태와 데이터 흐름

테스트 진행에 필요한 State는 `App.tsx`에서 관리합니다.

```text
screen
→ Start / Quiz / Result 단계 관리

currentQuestionIndex
→ 현재 질문 위치

selectedAnswers
→ 사용자가 선택한 Answer 누적
```

전체 데이터 흐름은 다음과 같습니다.

```text
financeTest
    ↓
   App
    ↓ Props
QuizScreen
    ↓ Callback
   App
    ↓
selectedAnswers
    ↓
calculateResult()
    ↓
ResultScreen
```

부모인 `App`이 필요한 데이터를 Props로 전달하고, 자식 Component에서 발생한 이벤트는 Callback을 통해 다시 `App`으로 전달해 State를 변경합니다.

## 주요 구현 포인트

### Props / Callback

- `StartScreen`: 시작 버튼 클릭 시 `onStart` 호출
- `QuizScreen`: 현재 질문과 진행 정보를 Props로 받고, 답변 선택 시 `onAnswerSelect` 호출
- `ResultScreen`: 계산된 `result`를 Props로 받고, 다시 테스트하기 클릭 시 `onRestart` 호출

### 최소 State와 Derived Value

기존 State에서 계산 가능한 값은 별도 State로 중복 저장하지 않았습니다.

- `currentQuestion`: `currentQuestionIndex`와 `financeTest.questions`로 계산
- `totalQuestions`: `financeTest.questions.length`로 계산
- `progressPercent`: 현재 질문 번호와 전체 질문 수로 계산
- `result`: `selectedAnswers`와 `financeTest.results`로 계산

특히 결과는 별도 State로 보관하지 않고, Result 화면을 렌더링하는 시점에 `calculateResult()`로 계산합니다.

### 데이터 / UI / 계산 로직 분리

- `financeTest`: 테스트 데이터
- Component: 화면 표현과 사용자 이벤트
- `App`: 화면 전환과 State 흐름
- `resultCalculator`: 결과 계산 규칙

결과 계산을 `ResultScreen` 안에 작성하지 않고 Pure Function으로 분리했습니다. 그래서 UI를 렌더링하지 않고도 계산 규칙만 독립적으로 테스트할 수 있습니다.

### 마지막 Answer 처리

마지막 질문에서도 선택한 Answer가 누락되지 않도록, 기존 선택값에 현재 Answer를 포함한 `nextSelectedAnswers`를 먼저 만든 뒤 State를 갱신합니다. 이후 Result 화면이 렌더링될 때 갱신된 `selectedAnswers`를 기준으로 결과를 계산합니다.

## 결과 계산과 테스트

### 결과 계산 규칙

기존 Kotlin V3 금융 테스트의 계산 규칙을 유지했습니다.

```text
1. 선택한 Answer의 scores를 Result ID별로 누적
2. 가장 높은 점수의 Result 선택
3. 동점이면 results 배열에서 먼저 정의된 Result 선택
4. 선택 답변 없음 / 유효 점수 없음 / 전체 점수 0이면 Result ID 3 반환
```

### Vitest

`resultCalculator`는 React UI와 분리된 순수 함수이므로 Vitest로 단위 테스트를 작성했습니다.

현재 테스트 결과:

```text
Test Files : 1 passed
Tests      : 8 passed
```

테스트에서는 다음 규칙을 확인합니다.

- Result 1 / 2 / 3 반환 규칙
- 점수 누적
- 동점 처리
- 선택 답변이 없는 경우
- 유효 점수가 없는 경우
- 전체 점수가 0인 경우

계산 규칙 자체에 집중하기 위해 테스트에서는 실제 `financeTest` 전체 데이터가 아니라 최소한의 `Result` / `Answer` 데이터를 구성했습니다.

## GitHub Actions CI

Pull Request 단계에서 핵심 품질 검증만 자동으로 실행합니다.

```text
Pull Request to develop / main
      ↓
Checkout
      ↓
Node.js 24 + npm cache
      ↓
npm ci
      ↓
ESLint
      ↓
Vitest
      ↓
Production Build
```

작은 POC이므로 OS / Node matrix, Coverage, E2E, 배포, artifact upload는 추가하지 않았습니다. CI에서는 현재 프로젝트에 필요한 `lint`, `test`, `build`만 확인합니다.

## Compose ↔ React 비교

아래 표는 두 기술이 완전히 동일한 개념이라는 의미가 아니라, 이번 POC에서 맡은 역할과 데이터 흐름을 기준으로 비교한 것입니다.

| Android Compose     | React             | 이번 구현에서 비교한 역할                  |
| ------------------- | ----------------- | ------------------------------------------ |
| `@Composable`       | Component         | UI를 함수 / Component 단위로 구성          |
| Parameter           | Props             | 부모에서 자식으로 필요한 데이터 전달       |
| Lambda Callback     | Callback Props    | 자식 이벤트를 부모로 전달                  |
| Compose State       | `useState`        | 화면 단계, 질문 index, 선택 답변 관리      |
| Recomposition       | Re-render         | State 변경에 따른 선언형 UI 갱신 관점 비교 |
| Kotlin `data class` | TypeScript `type` | 테스트 데이터 구조 정의                    |
| 계산 함수 분리      | Pure Function     | UI와 계산 규칙을 분리해 테스트             |

## 실행 방법

Node.js 24와 npm 기준으로 실행합니다.

```bash
npm install
npm run dev
```

검증 명령은 다음과 같습니다.

```bash
npm run lint
npm run test:run
npm run build
```

## 구현하며 확인한 점

- Compose와 React를 State 기반 선언형 UI 관점에서 비교할 수 있었습니다.
- React에서는 Props와 Callback을 통해 부모-자식 데이터 흐름을 직접 구성합니다.
- State와 Derived Value를 구분해 불필요한 State를 만들지 않았습니다.
- 결과 계산 로직을 UI에서 분리하면 Pure Function 단위 테스트가 쉬워집니다.
- 현재 POC 규모에서는 별도 전역 상태 관리 도구 없이 `App`의 State와 Props / Callback 흐름으로 충분했습니다.
- CI는 가능한 모든 검증이 아니라 현재 프로젝트에 필요한 lint / test / build만 자동화했습니다.
