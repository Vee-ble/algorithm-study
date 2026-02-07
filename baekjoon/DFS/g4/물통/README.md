### **1. 요구사항 분석**

**요구사항 요약:**

- **용량이 A,B,C인 물통이 있음. 초기 상태(0,0,C)**
- 물을 부을 때는 “어느 한 물통이 비거나” or “받는 물통이 가득 찰 때까지” 만 부을 수 있음.
- 첫 번째 물통(A)이 0 일 때, 세 번째 물통(C)에 들어있을 수 있는 모든 양을 오름차순으로 구하기.

**제약 사항(Constraints): 1 ≤ A,B,C ≤ 200**

가능한 연산의 수는 최대 200 x 200 x 200이지만 전체 물의 양(C)이 고정되어 있으므로 두 물통의 양만 알면 나머지 하나는 자동으로 결정(200 x 200 = 40,000)

**입출력 예시 분석: 8,9,10**

- (0,0,10) → A가 0이므로 10 가능.
- (0,0,10) → (0,9,1) → A가 0이므로 1 가능.
- 이런식으로 몯느 전이 과정을 거쳐 A = 0인 순간의 C 값을 수집.

**예외 케이스(Edge Case):**

- A,B가 C보다 큰 경우: 아무리 옮겨도 A,B를 다 채울 수 없음.
- C가 매우 작은 경우 (C = 1): 이동 경로 단순

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

- DFS. 모든 가능한 물 옮기기 시나리오 탐색.
- 상태 정의: (a,b,c) (각 물통에 남은 물의 양)
- 방문 처리: 이미 확인한 (a,b) 조합은 다시 계산 X

**Trade-off 분석:**

장점: 재귀를 통한 구현이 직관적, 모든 상태 빠짐없이 탐색 가능

단점: 깊이가 깊어지면 Stack Overflow 위험이 있으나, 이 문제의 상태 공간(4만 개)는 충분히 안전.

**예상 시간/공간 복잡도: O(A X B), O(A X B)**

### 3. 의사코드 & 검증

```jsx
function dfs(a,b,c)
// 이미 방문한 적 있다면 종료
if(visited[a][b]) return;
visited[a][b] = true;
if(a===0) answer[c] = true;

// 1. A -> B
// 2. A -> C
// 3. B -> A
// 4. B -> C
// 5. C -> A
// 6. C -> B
// 각 케이스별로 Math.min(주는양, 받는쪽 남은용량) 계산 후 이동
}
```

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(" ");

const [A, B, C] = input.map(Number);

const visited = Array.from({ length: 201 }, () => new Array(201).fill(false));
const result = new Array(201).fill(false);

const limits = [A, B, C];

function dfs(curr) {
  const [a, b, c] = curr;

  // 이미 탐색한 조합이면 종료.
  if (visited[a][b]) return;

  visited[a][b] = true;

  if (a === 0) {
    result[c] = true;
  }

  // 6가지 이동 경우의 수 (i: 주는 물통, j: 받는 물통)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === j) continue;

      const next = [a, b, c];
      // 옮길 수 있는 양 = (주는 물통의 물 양)과 (받는 물통의 남은 공간) 중 최소값
      const amount = Math.min(next[i], limits[j] - next[j]);

      next[i] -= amount;
      next[j] += amount;

      dfs(next);
    }
  }
}
dfs([0, 0, C]);

// 결과 정렬 및 출력
const output = [];
for (let i = 0; i <= C; i++) {
  if (result[i]) output.push(i);
}
console.log(output.join(" "));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble)**

- **Call Stack 위험:** 상태 공간(40,000개)이 Node.js의 스택 한도를 초과할 수 있는 가능성을 간과하고 재귀를 사용함.
- **메모리 낭비:** DFS 탐색 중 루프마다 새로운 배열 객체를 생성하여 GC에 부담을 줌.

**해결 과정 (Shooting)**

- **BFS/Iterative DFS 고려:** 실제 현업이나 대규모 입력값에서는 재귀 대신 명시적인 스택/큐를 사용하여 `Stack Overflow`를 방지해야 함을 인지.
- **백트래킹 패턴 학습:** 매번 배열을 복사(`[...curr]`)하는 대신, 상태를 변경하고 재귀 호출 후 다시 원상복구(Undo)하는 방식으로 메모리 할당을 최소화할 수 있음.

**새롭게 알게 된 점 (Learning)**

- **V8 GC Generations:** 짧게 생존하는 객체는 `Young Generation`에서 빠르고 저렴하게 수거된다.
- **참조 타입 버그:** `const next = curr`와 같이 할당하면 주소값이 공유되어, 재귀 호출 이후의 상태가 오염된다는 점(Side Effect).

**아쉬운 점 & 리팩토링 계획 (Refactoring)**

- 다음에는 `Array.from`이나 `spread` 연산자로 매번 객체를 찍어내기보다, 값을 변경하고 복구하는 **백트래킹 스타일**로 구현하여 메모리 효율성을 극대화해보고 싶음.
