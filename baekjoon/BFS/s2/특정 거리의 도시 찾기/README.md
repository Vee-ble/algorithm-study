### **1. 요구사항 분석**

**요구사항 요약: 1부터 N의 노드와, M개의 경로가 존재. 모든 가중치는 1**

특정 노드 X로부터 도달할 수 있는 모든 노드 중, 최단 거리가 정확히 K인 모든 노드들의 번호를 출력하라.

또한 출발 노드 X 자기 자신의 최단거리는 0.

**제약 사항(Constraints):**

노드의 개수 *N*, 경로의 개수 *M*, 거리 정보 *K*, 출발 노드의 번호 *X*

 2 ≤ *N* ≤ 300,000, 1 ≤ *M* ≤ 1,000,000, 1 ≤ *K* ≤ 300,000, 1 ≤ *X* ≤ *N*

**예외 케이스(Edge Case):**

- 최단 경로가 K인 노드가 없을 경우 -1 반환
- K가 N보다 크면 해당하는 노드가 없음 -1 반환

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. 입력들을 loop 돌며 graph 2차원 배열에 넣는다. idx는 시작 노드, 값은 도착 노트
2. N + 1 크기의 dist 배열 생성. dist[X] = 0 으로 초기화, 나머지 -1
3. 큐에 X를 넣고, while loop(큐에 값이 있으면)
   1. 큐 맨 앞에서 값 추출
   2. 이 값으로 graph를 loop
      1. 그래프의 값이 dist에서 -1이라면 값 업데이트, 큐에 삽입

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(N + M), O(N + M)**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
1. const graph = Array.from({length: N + 1}, () => {})
2. const dist = Array(N+1).fill(-1)

dist[X] = 0

let head = 0;
const queue = []
queue.push(X)

while(queue.length > 0)
	const cur = queue[head++]

	for(next of graph[cur])
		if(dist[next] === -1) // 아직 방문 안했다면
			dist[next] = dist[cur] + 1
			queue.push(next)

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

const [N, M, K, X] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  if (!input[i]) continue;
  const [start, end] = input[i].split(" ").map(Number);
  graph[start].push(end);
}

const dist = Array(N + 1).fill(-1);
dist[X] = 0;

const queue = [X];
let head = 0;

while (head < queue.length) {
  const cur = queue[head++];

  for (const next of graph[cur]) {
    if (dist[next] === -1) {
      dist[next] = dist[cur] + 1;
      queue.push(next);
    }
  }
}

const result = [];
for (let i = 1; i <= N; i++) {
  if (dist[i] === K) {
    result.push(i);
  }
}

if (result.length === 0) {
  console.log(-1);
} else {
  console.log(result.sort((a, b) => a - b).join("\n"));
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**아쉬운 점 & 리팩토링 계획:**

- 마지막 출력까지 의사코드를 작성.
