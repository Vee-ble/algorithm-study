### **1. 요구사항 분석**

**요구사항 요약: 1부터 N까지의 수로 이루어진 순열을 사전순으로 출력하라.**

**제약 사항(Constraints): N(1 ≤ N ≤ 8)**

**입출력 예시 분석:**

-

**예외 케이스(Edge Case):**

- N이 1인 경우 → 1 반환
- N이 최대값 8인 경우 → 연산이 많아지기에 오버플로우 주의

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** BFS 기반 백트래킹

중복을 허용하지 않는 모든 수열을 만들기 위해 재귀를 호출할 때 인자를 증가시켜서 호출한다.

**선택한 자료구조 근거:**

- 선택: Array
- 이유: 선택한 숫자들을 순서대로 담고, 출력을 위한 형태를 join(” ”)을 이용하여 쉽게 해결

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(N^2) / O(N)**

### 3. 의사코드 & 검증

```jsx
const N = // N 값

function bfs(start_node, depth)
	if(depth === N) return

	// 1

	for(let i = start_node; i <= N; i++)
			cur_sequence.push(i)
			bfs(i+1, depth+1)
			cur_sequence.pop()

```

**Dry Run (손으로 돌려보기):**

N = 3

bfs(1, 0) → cur_sequence: [1]

bfs(2, 1) → cur_sequence: [1, 2]

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

const N = Number(input);
const visited = new Array(N + 1).fill(false);
const cur_sequence = [];

let result = "";

function dfs(depth) {
  if (depth === N) {
    result += cur_sequence.join(" ") + "\n";
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      cur_sequence.push(i);

      dfs(depth + 1);

      cur_sequence.pop();
      visited[i] = false;
    }
  }
}
dfs(0);

console.log(result);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble) & 해결 (Shooting)**

1. **로직 혼동**: 초기에는 `start_node` 파라미터를 사용하여 오름차순을 강제하는 로직(조합)을 생각했음.
   - **해결**: 순열은 순서가 중요하고 모든 숫자를 다 써야 하므로, `start_node` 대신 `visited` 배열을 사용하여 중복만 방지하는 방식으로 수정.

**새롭게 알게 된 점 (Algorithm)**

- **순열(Permutation) 구현**: `for (let i = 1; i <= N)`으로 매번 전체를 훑되, `if (!visited[i])`로 거르는 패턴.
- **조합(Combination) 구현**: `for (let i = start; i <= N)`으로 이전에 고른 수 다음부터 고르는 패턴. (`visited` 불필요)
- **시간 복잡도**: N!은 생각보다 매우 빠르게 증가하므로 N≤ 10 수준에서만 사용 가능하다.

**개선할 점**

- 문제를 보자마자 "순서가 필요한가?(순열)" vs "구성만 중요한가?(조합)"를 판단하여 템플릿을 꺼내는 연습을 하자.
