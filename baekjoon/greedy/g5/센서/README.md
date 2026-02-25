### **1. 요구사항 분석**

**요구사항 요약: N개의 센서와 K개의 집중국이 있을 때, N개의 센서는 적어도 하나의 집중국과 통신 가능해야 하고, 집중국의 수신 가능 영역의 길이의 합을 최소화 한다.**

간단히 설명하자면, 직선 평면상 N개의 점이 좌표 상에 위치하고, 이를 잇는 K개의 점이 있을 때 K를 기준으로 N개의 점을 모두 잇는 최소한의 거리를 구한다.

**제약 사항(Constraints):** `(시간 복잡도, 메모리, 입력 크기 등)`

**예외 케이스(Edge Case):**

- K가 N보다 크거나 같다면 각 센서에 집정국이 위치하면 되기에 최종 거리는 0이다.
- 센서들이 모두 같은 좌표라면? 최종 거리는 0이 된다
- K = 1, 수신 영역의 길이는 어떻게 구할까?

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

**선택한 자료구조 근거:**

- 선택: `Map` vs `Object`
- 이유: `(ex: 데이터의 빈번한 삽입/삭제가 필요하므로...)`

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도:**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
if N <= K 라면 0 출력

// 센서 배열 정렬(ASC)
const diffDistance = 센서간 거리 차이를 가진 배열(N-1 크기, 내림차순)
// 0부터 K - 1까지 diffDistance 요소를 0으로 만듦.

// 반복이 종료되면 diffDistance의 합을 구함.

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
const K = Number(input[1]);

const positions = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solve(positions, N, K) {
  if (N <= K) return console.log(0);

  const diffDistance = new Array(N - 1);

  for (let i = 0; i < N - 1; i++) {
    diffDistance.push(positions[i + 1] - positions[i]);
  }

  diffDistance.sort((a, b) => b - a);
  const result = diffDistance.slice(K - 1).reduce((acc, cur) => acc + cur, 0);

  console.log(result);
}
solve(positions, N, K);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

- **시간 복잡도 초과 위험:** 매 분할마다 배열을 순회하며 최댓값을 찾는 O(N X K) 방식은 N이 커질수록 연산 비용이 기하급수적으로 증가함.
- **메모리 재할당 오버헤드 및 불필요한 연산:** 빈 배열에 `push`로 동적 할당을 반복하면 자바스크립트 엔진 내부에서 메모리 재할당 비용이 발생함. 또한 이미 정렬된 데이터에 `Math.abs`를 호출하는 불필요한 연산이 존재했음.

**해결 과정(Shooting):**

- 센서 간의 거리 배열을 한 번만 구한 뒤 내림차순 정렬하여, 상위 K-1개를 한 번에 잘라내는 방식으로 변경. 전체 시간 복잡도를 O(N log N)으로 획기적으로 단축함.
- `new Array(N - 1)`로 필요한 메모리 공간을 미리 확보해 동적 확장 비용을 제거함. 또한 오름차순 정렬이 보장되어 있으므로 `positions[i + 1] - positions[i]` 형태의 단순 뺄셈으로 변경하여 함수 호출 오버헤드를 최적화함.
