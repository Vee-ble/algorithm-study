### **1. 요구사항 분석**

**요구사항 요약: 1과 0으로된 지도가 있을 때, 1의 집합의 개수를 구하고, 각 집합들이 몇개의 1을 가지는 지 구하라.**

**제약 사항(Constraints): 5 ≤ N ≤ 25 (지도의 크기), 상하좌우만 같은 단지로 인식**

**예외 케이스(Edge Case):**

- `(기본 예제 제외. ex: 입력이 없거나 최소값/최대값인 경우, 중복 데이터 등)`

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

- 이중 배열을 루프한다.
- visited가 false이고, 값이 1이라면 큐에 넣는다. (방문 처리, 카운터 증가)
- 큐를 while loop한다.
- 상하좌우 값이 옮고, 1이면 큐에 삽입한다.

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 인덱스로 접근하기 쉽고, 큐를 쉽게 구현할 수 있다.

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(N^2), O(N^2)**

### 3. 의사코드 & 검증

```jsx
const directions
const visited = Using N

function solve() {
	const queue = [];

	for r of N :
		for c of N :
			if !visited[r][c] && map[r][c] === 1 :
					queue.push([r,c])
					visited[r][c] = true
					count++

	while(queue.length > 0)
		// 큐에서 뺀 좌표에 상하좌우로 이동한 값을 구한다. for문
		// 각 이동한 값이 다음 조건에 만족하는 지 확인. 새 좌표 nr, nc
			// nr >= 0 && nr < N && nc >= 0 && nc < N
			// visited[nr][nc]가 false일 때

		// 위 조건을 만족하면 큐에 삽입. 방문 처리
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

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const map = [];

for (let i = 1; i < input.length; i++) {
  map.push(input[i].split("").map(Number));
}

const directionR = [1, -1, 0, 0];
const directionC = [0, 0, 1, -1];

const visited = Array.from({ length: N }, () => Array(N).fill(false));

let count = 0;
const countSet = [];

function solution() {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (visited[r][c] || map[r][c] !== 1) continue;

      count++;
      let partedCount = 0;
      const queue = [[r, c]];
      visited[r][c] = true;
      let head = 0;

      while (head < queue.length) {
        const [curR, curC] = queue[head++];
        partedCount++;

        for (let i = 0; i < 4; i++) {
          const nr = directionR[i] + curR;
          const nc = directionC[i] + curC;

          if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
            if (!visited[nr][nc] && map[nr][nc] === 1) {
              queue.push([nr, nc]);
              visited[nr][nc] = true;
            }
          }
        }
      }
      countSet.push(partedCount);
    }
  }
}
solution();

console.log(count);
console.log(countSet.sort((a, b) => a - b).join("\n"));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점:**

- **가비지 컬렉터와 도달 가능성(Reachability):** GC는 단순히 '사용하지 않는' 데이터가 아니라 '루트에서 참조할 수 없는(Unreachable)' 데이터를 지운다는 것을 이해함. 포인터 큐 사용 시 메모리 해제를 위해 원형 큐나 명시적 참조 해제가 필요함을 배움.
- **콜 스택(Call Stack)과 힙(Heap) 메모리의 차이:** DFS(재귀)는 콜 스택을 사용하므로 최대 호출 횟수(약 1만 번 내외)를 넘기면 `Stack Overflow`가 발생하지만, BFS(큐)는 힙 영역의 배열을 사용하므로 N이 매우 큰 환경(ex: N=10,000)에서도 안전하게 그래프를 탐색할 수 있음을 깨달음. 시간 복잡도의 연산 횟수(1초당 1억 번)와 콜 스택 제한을 혼동하지 않게 됨.

**아쉬운 점 & 리팩토링 계획:**

- **상태 변수 최소화:** 단지의 개수를 세는 `count` 변수와 단지 크기 배열인 `countSet`을 따로 관리했는데, `countSet.length`가 곧 단지의 개수이므로 불필요한 `count` 변수를 제거하여 상태를 단순화할 수 있음.
- **전역 변수 캡슐화:** 실무 및 클린 코드 관점에서 `map`, `visited`, 방향 벡터 배열 등을 전역에 두지 않고 `solution()` 함수 내부로 이동시켜 스코프를 제한하고 사이드 이펙트를 방지할 계획임.
