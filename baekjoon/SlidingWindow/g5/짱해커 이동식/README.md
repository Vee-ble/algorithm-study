### **1. 요구사항 분석**

**요구사항 요약: k크기의 윈도우를 갖고, 이 윈도우 내부에서 가장 작은 값을 선택한다. 윈도우는 1씩 증가하고, 선택한 작은 값들 중 가장 큰 값을 반환한다.**

**제약 사항(Constraints): 1 ≤ K < N ≤ 100,000**

**예외 케이스(Edge Case):**

- K가 1일 때, 요소들 중 가장 큰 값 반환
- N이 100,000일 때, K / N번 수행되기에 연산에 문제가 없다.
- 같은 크기의 값(비용)이 주어질 때, 둘 중 하나를 선택

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

costs : 모든 비용을 담고 있는 배열

1.
2. start, end를 0과 k-1 선언하고, while loop (end < N)
   1. start와 end 범위 내에서 최소값을 구한 뒤 result에 push
   2. start와 end 증감.
3. result 중 최댓 값 반환.

**Trade-off 분석:**

**예상 시간/공간 복잡도: 시간 복잡도의 경우 슬라이딩 윈도우 덕에 N / K번 수행되지만 내부에서 K번 다시 수행되기에 N / K \* K = N 번 수행이 된다. 공간 복잡도는 O(K-1)**

### 3. 의사코드 & 검증

```jsx
let start = 0
let end = k - 1
let max = 0

// 01 12 23 34

while(end < N)
	start와 end 범위 내의 최소값을 구함.
	max = Math.max(max, 최소값) // 4
	start, end 증감

max 반환
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

function solution(input) {
  const [N, K] = input[0].split(" ").map(Number);
  const costs = input[1].split(" ").map(Number);

  let start = 0;
  let end = K - 1;
  let max = 0;

  while (end < N) {
    let min = Infinity;

    for (let i = start; i <= end; i++) {
      min = Math.min(min, costs[i]);
    }

    max = Math.max(max, min);
    start++;
    end++;
  }
  return max;
}

console.log(solution(input));
```

최적화한 코드

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, K] = input[0].split(" ").map(Number);
const costs = input[1].split(" ").map(Number);

let start = 0;
let end = K - 1;
let max = 0;

if (K === 1) {
  console.log(Math.max(...costs));
  return;
} else {
  while (end < N) {
    let min = Infinity;
    let minIdx = -1;

    for (let i = start; i <= Math.min(end, N - 1); i++) {
      if (costs[i] <= min) {
        min = costs[i];
        minIdx = i;
      }
    }

    max = Math.max(max, min);
    start = minIdx + 1;
    end = minIdx + K;
  }
  console.log(max);
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

- Call Stack Size Exceeded 위험: Spread 연산자는 배열의 요소들을 함수의 인수로 펼쳐서 전달하는데 Node.js환경에서 함수에 전달할 수 있는 최대 개수 제한이 있다.

**해결 과정(Shooting):**

- for 루프로 순회하여 최댓값을 갱신하는 방식으로 해결 예정.

**새롭게 알게 된 점:**

- **CS 지식 (메모리 구조):** 자바스크립트 엔진에서 크기가 큰 배열 자체는 힙(Heap) 영역에 안전하게 저장되지만, 스프레드 연산자를 함수 호출과 함께 쓰면 콜 스택(Call Stack)에 쪼개져 쌓인다는 동작 원리를 이해함.
- **자료구조 & 알고리즘:** "새로 들어온 값보다 크고 오래된 데이터는 버린다"는 원리를 가진 모노토닉 큐 알고리즘의 작동 방식(덱의 뒤에서는 가성비 비교 후 삭제, 앞에서는 유통기한 확인 후 삭제)을 익힘.

**아쉬운 점 & 리팩토링 계획:**

- 변수명 가독성: min, max 보다는 minCostInWindow, MaxOfMinCosts등으로 명명.
- 중복 연산 방지: `for (let i = start; i <= Math.min(end, N - 1); i++)` 에서 루프가 돌 때마다 `Math.min` 함수가 지속적으로 호출되는데 루프 진입 전에 `const loopEnd = Math.min(end, N - 1);`로 미리 선언해 두는 것이 성능 최적화 측면에서 좋음.
- 모노토닉 큐 (Monotonic Queue / Deque)를 활용하여 O(N) 시간 복잡도를 보장하는 코드로 구현 예정.
