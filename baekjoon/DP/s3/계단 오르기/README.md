### **1. 요구사항 분석**

**요구사항 요약:**

- 계단은 한 칸 or 두 칸 씩 오를 수 있다.
- 마지막 계단은 반드시 밟아야 한다.
-

**제약 사항(Constraints): 계단의 개수 ≤ 300, 점수 ≤ 10,000 (둘 다 자연수)**

**예외 케이스(Edge Case):**

- 계단의 개수 ≤ 2 라면 총 합 반환

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

dp[i]: i번째 계단까지 올랐을 때 얻을 수 있는 최대 점수

마지막 N번째 계단은 무조건 밟아야 하고, 3개 이상 계단을 연속되게 밟을 수 없다.

n번째 계단의 계단에 도달하는 방법은

**두 계단 전에서 오르기**

- N-2번 째 계단을 밟고, N - 1번 째는 건너뛰고, N번 째 계단을 밟는다.
- 점화식 - dp[n-2] + score[n]

**한 계단 전에서 오르기**

- N-3번째 계단을 밟고, N-2번 째 계단은 건너뛴다. N-1번 째 계단과 N번째 계단은 밟는다.
- 점화식 - dp[n-3] + score[n-1] + score[n]

이 둘 중 큰 값을 반환한다.

**선택한 자료구조 근거:**

- 선택: 상수
- 이유: 배열도 dp 값을 저장하여 상태(지금까지 max값)를 추적할 수 있지만 그렇게 처리할 경우 N만큼의 공간 복잡도가 든다. 이 문제의 경우 최근 세개의 dp 값인 dp[n-3], dp[n-2], dp[n-1]만큼의 고정 값만 들기에 상수로 처리하여 최적화 할 수 있다. 이것이 Constant Transition pattern이다.

**Trade-off 분석:** 배열을 이용하는 것보다 메모리가 절약된다.

**예상 시간/공간 복잡도: O(N), O(1)**

### 3. 의사코드 & 검증

```jsx
// costs <= 2 일 경우 costs들의 합 반환
// costs <= 3 일 경우 Math.max(costs[0] + costs[2], costs[1] + costs[2])

let dp_i_3 = scores[0]
let dp_i_2 = scores[0] + scores[1]
let dp_i_1 = Math.max(scores[0] + scores[2], scores[1] + scores[2])
let prevScore = scores[2]

// 두 점화식
dp_i_2 + curScore
dp_i_3 + prevScore + curScore

둘 중 큰 값이 curMaxScore

dp_i_3 = dp_i_2
dp_i_2 = dp_i_1
dp_i_1 = curMaxScore

n까지 반복하면 curMaxScore 반환
```

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const scores = input.slice(1).map(Number);

if (N === 1) {
  console.log(scores[0]);
  return;
}
if (N === 2) {
  console.log(scores[0] + scores[1]);
  return;
}
if (N === 3) {
  console.log(Math.max(scores[0] + scores[2], scores[1] + scores[2]));
  return;
}

let dp_i_3 = scores[0];
let dp_i_2 = scores[0] + scores[1];
let dp_i_1 = Math.max(scores[0] + scores[2], scores[1] + scores[2]);
let prevScore = scores[2];

for (let i = 3; i < N; i++) {
  const curScore = scores[i];

  const curMaxScore = Math.max(
    dp_i_2 + curScore,
    dp_i_3 + prevScore + curScore,
  );

  prevScore = curScore;
  dp_i_3 = dp_i_2;
  dp_i_2 = dp_i_1;
  dp_i_1 = curMaxScore;
}

console.log(dp_i_1);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

1. 반복문 시작 인덱스 오류: 4번째 계단을 계산하려면 인덱스 3부터 시작해야 하는데 4로 시작
2. N이 1,2,3일 때 예외처리를 했으나, 그 직후 함수나 프로세스를 종료하지 않음.

**해결 과정(Shooting):**

1. **수정:** `for (let i = 4; i < N; i++)` ➔ `for (let i = 3; i < N; i++)`
2. return 처리.

**새롭게 알게 된 점:**

1. 메모리 계층 구조(Memory Hierarchy)와 캐시 비트:
   1. 배열을 사용함녀 데이터가 메인 메모리(RAM)의 Heap 영역에 할당되어, CPU가 데이터를 가져올 때마다 상대적으로 느린 메모리 접근 비용이 발생. 원시 타입을 사용하면 OS와 V8 엔진이 이를 최상단 CPU 레지스터나 L1 캐시에 올려두고 연산할 확률이 높아져 시간 복잡도는 동일해도 상수 시간이 비약적으로 단축되어 실제 실행 속도가 훨씬 빨라짐.
   2. 가비지 컬렉터 부하 감소: 배열을 크게 할당하지 않아 V8 엔진의 Mark-and-Sweep 연산 부하 감소

**아쉬운 점 & 리팩토링 계획:** dp_i_3 같은 변수 명의 가독성이 좋지 않은 것 같음.
