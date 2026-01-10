### **1. 요구사항 분석**

N개의 강연 제안이 들어왔다. 각 강연은 강연료 p와 기한 d가 있다. 하루에 하나의 강연만 할 수 있을 때, 벌 수 있는 최대 강연료를 구하라.

- **제약 사항**:
  - N ≤ 10,000, d ≤ 10,000
- **핵심**:
  - 기한이 d일이면, 1일부터 d일 사이 아무 때나 강연을 하면 된다.
  - 날짜별로 최적의 선택을 해야 한다 (Greedy).

### **2. 해결 전략 및 자료구조 설계**

핵심 전략 (Greedy + Priority Queue)

1. **정렬**: 강연을 **기한(Date) 기준 오름차순** 정렬한다. (기한이 임박한 것부터 처리)
2. **선택 및 교체**:
   - 강연을 하나씩 확인하며 무조건 스케줄(Min Heap)에 넣는다.
   - 스케줄에 있는 강연 수(`heap.size()`)가 현재 강연의 기한(`date`)보다 많아지면, **물리적으로 불가능한 스케줄**이 된다.
   - 이때, 스케줄에 있는 강연 중 **가장 강연료가 싼 것**을 뺀다 (`pop`).
   - 왜? 싼 걸 빼고 현재의 비싼 강연을 남기는 것이 이득이기 때문.

### 자료구조 선택 이유

- **최소 힙 (Min Heap)**: 현재 스케줄에 담긴 강연 중 "가장 싼 강연"을 O(log N)에 찾고 삭제하기 위해 사용.

### 복잡도 분석

- **시간 복잡도**: O(N log N)
  - 정렬 O(N log N) + 힙 삽입/삭제 N \* O(log N).
- **공간 복잡도**: O(N) (힙 저장 공간)

### 3. 의사코드 & 검증

```jsx

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

const n = Number(input[0]);
const lectures = [];

for (let i = 1; i <= n; i++) {
  lectures.push(input[i].split(" ").map(Number));
}

lectures.sort((a, b) => a[1] - b[1]);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;
      [this.heap[parentIdx], this.heap[idx]] = [
        this.heap[idx],
        this.heap[parentIdx],
      ];
      idx = parentIdx;
    }
  }

  bubbleDown() {
    let idx = 0;
    while (true) {
      let leftChild = 2 * idx + 1;
      let rightChild = 2 * idx + 2;
      let smallest = idx;

      // 왼쪽 자식 index가 heap 범위를 넘지 않고, 왼쪽 자식의 값이 부모(더 작은 값)보다 작다면 leftChild를 더 작은 값으로 설정
      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] < this.heap[smallest]
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[smallest]
      ) {
        smallest = rightChild;
      }

      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
  }
  size() {
    return this.heap.length;
  }

  sum() {
    return this.heap.reduce((acc, cur) => acc + cur, 0);
  }
}

const pq = new MinHeap();

for (const [money, date] of lectures) {
  pq.push(money);

  if (pq.size() > date) {
    pq.pop();
  }
}

console.log(lectures);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble) & 해결 (Shooting)**

1. **초기 전략 오류**: "같은 날짜면 제일 비싼 것만 한다"는 Map 전략을 세웠으나, (50, 2), (10, 2) 처럼 같은 날짜라도 둘 다 할 수 있는 경우가 있음을 깨닫고 Min Heap으로 선회.
2. **출력 실수**: 힙 객체나 입력 배열을 출력하는 실수가 있었음. `pq.sum()` 메서드를 통해 힙 내부의 합을 출력하도록 수정.

### 새롭게 알게 된 점

- **우선순위 큐 활용**: 그리디 문제에서 "일단 넣고, 조건 위배 시 최솟값을 뺀다"는 패턴이 매우 유용함을 배움.
- **직접 구현**: 자바스크립트는 내장 Heap이 없어 직접 구현해야 하는데, 이 과정을 통해 힙의 동작 원리(Bubble Up/Down)를 복습함.

### 개선할 점

- 문제를 풀기 전, 내 전략(Map)에 반례가 없는지 더 꼼꼼히 검증하는 습관을 들이자.
