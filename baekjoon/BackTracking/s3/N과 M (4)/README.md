### **1. 요구사항 분석**

**요구사항 요약:**

- 1부터 N까지 자연수 중 M개를 선택한 수열.
- 중

**제약 사항(Constraints): 1 ≤ M ≤ N ≤ 8**

**입출력 예시 분석:**

N = 3, M = 2

[1,1]

[1,2]

[1,3]

[2,2]

[2,3]

[3,3]

**예외 케이스(Edge Case):**

- N, M = 1, 출력도 1
- N, M = 8, 가장 깊은 재귀가 발생하는 케이스로, 출력량이 많아질 수 있음.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** DFS 기반 백트래킹

- 수열의 각 자리를 결정할 때, 이전에 선택한 숫자보다 크거나 같은 숫자부터 선택하도록 범위를 제한하면 비내림차순이 된다.
- 재귀 함수를 호출할 때 현재 선택한 숫자를 인자로 넘겨주어, 다음 단계에서 그 숫자부터 탐색을 시작

**선택한 자료구조 근거:**

- 선택: Array
- 이유: 선택한 숫자들을 순서대로 담고, 마지막에 한번에 출력하거나 join(’ ‘)으로 변환하기에 적합.

**예상 시간/공간 복잡도: O(N^M), O(M)**

### 3. 의사코드 & 검증

```jsx
// @params : start_node(시작 숫자), depth(M을 넘지 않기 위한 깊이)
function DFS(start_node, depth)
1. if depth === M:
		current_sequence 출력
2. for(let i = start_node; i <= N; i++)
		current_sequence.push(i)
		DFS(i, depth + 1)
		current_sequence.pop()
```

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

const [N, M] = input.split(" ").map(Number);
const current_sequence = [];

let result = "";

function DFS(start_node, depth) {
  if (depth === M) {
    result += current_sequence.join(" ") + "\n";
    return;
  }

  for (let i = start_node; i <= N; i++) {
    current_sequence.push(i);
    DFS(i, depth + 1);
    current_sequence.pop();
  }
}

DFS(1, 0);

console.log(result);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점 (Algorithm)**

- **백트래킹 패턴**:
  - **중복 허용 + 비내림차순**: `dfs(i, depth + 1)` (현재 `i`부터 다시 시작)
  - **중복 불가 + 오름차순**: `dfs(i + 1, depth + 1)` (다음 숫자 `i+1`부터 시작)
  - 이 인자 전달 하나 차이로 순열, 조합, 중복순열, 중복조합이 결정된다는 것을 배움.
