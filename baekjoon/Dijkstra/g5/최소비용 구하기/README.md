### **1. 요구사항 분석**

**요구사항 요약: N개의 노드, M개의 경로가 있을 때, A번째 노드에서 B번째 노드까지 가는데 드는 비용의 최소 비용을 반환하라.**

**제약 사항(Constraints):**

line1 : N(1 ≤ N ≤ 1,000)

line2: M(1 ≤ M ≤ 100,000)

line3~M+2: 그래프 정보. [ 출발노드, 도착 노드, 비용 ] 형태.

lineM+3: 출발노드 번호, 도착노드 번호

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** DFS을 이용한다.

1. 최솟값을 저장할 변수 minDistance (초기값 Infinity)
2. 큐에 [시작노드, 비용(0)]을 삽입하고, 큐에 값을 하나씩 빼면서 루프한다.
   1. 큐에서 뺀 노드 값이 도착 노드라면, minDistance를 업데이트 하고, continue
   2. 도착 노드가 아니라면 해당 노드에서 이동할 수 있는 모든 노드를 비용을 업데이트하며 추가한다.
3. 비용을 출력한다.

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(N + M), O(N+M)**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
// 1. 초기화
const dist = Array(N + 1).fill(Infinity); // 모든 거리 무한대
dist[A] = 0; // 시작점 A은 0

// 2. 우선순위 큐 준비 (비용이 낮은 순으로 정렬되는 구조)
const pq = new PriorityQueue();
pq.push([A, 0]); // [노드, 현재까지의 비용]

while (!pq.isEmpty()) {
  // 가장 비용이 적은 노드를 꺼냄
  const [curNode, curCost] = pq.pop();

  // 이미 기록된 최단 거리보다 현재 비용이 크다면?
  // 이미 더 좋은 길을 찾았다는 뜻이므로 탐색할 가치가 없음
  if (dist[curNode] < curCost) continue;

  // 도착지 최적화:
  // curNode === B일 때 바로 종료할 수도 있지만,
  // 일반적으로 다익스트라는 모든 간선을 확인하며 dist를 갱신

  for (const [nextNode, nextCost] of graph[curNode]) {
    const newCost = curCost + nextCost;

    // '새로운 경로'가 '기존에 알고 있던 경로'보다 저렴할 때만 이동
    if (newCost < dist[nextNode]) {
      dist[nextNode] = newCost;
      pq.push([nextNode, newCost]);
    }
  }
}

// 3. 결과 출력
console.log(dist[B]);
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
const M = Number(input[1]);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 2; i < M + 2; i++) {
  const [start, end, cost] = input[i].split(" ").map(Number);
  graph[start].push([end, cost]);
}

const [startNode, endNode] = input[M + 2].split(" ").map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  pop() {
    if (this.size() === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }
  size() {
    return this.heap.length;
  }
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][1] <= this.heap[index][1]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }
  bubbleDown() {
    let index = 0;
    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let smallest = index;
      if (left < this.size() && this.heap[left][1] < this.heap[smallest][1])
        smallest = left;
      if (right < this.size() && this.heap[right][1] < this.heap[smallest][1])
        smallest = right;
      if (smallest === index) break;
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];
      index = smallest;
    }
  }
}

const dist = new Array(N + 1).fill(Infinity);
dist[startNode] = 0;
const pq = new MinHeap();
pq.push([startNode, 0]);

while (pq.size() > 0) {
  const [curNode, curCost] = pq.pop();

  if (dist[curNode] < curCost) continue;

  for (const [nextNode, nextCost] of graph[curNode]) {
    const combinedCost = curCost + nextCost;
    if (combinedCost < dist[nextNode]) {
      dist[nextNode] = combinedCost;
      pq.push([nextNode, combinedCost]);
    }
  }
}

console.log(dist[endNode]);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

1. DFS로 해결하려하여 시간 초과가 발생. DFS는 O(V+E), 다익스트라는 O(E log V)

**해결 과정(Shooting):**

1. minHeap을 구현하여 다익스트라 알고리즘으로 해결함.

**아쉬운 점 & 리팩토링 계획:**

- this.compare = compare || ((a, b) => a[1] - b[1]); 를 추가하여 generic하게 작성.
- 자식과 부모의 인덱스를 구하는 식을 함수로 변환하여 가독성 개선.
