class MinHeap {
  constructor(compareFunc = (a, b) => a < b) {
    this.heap = [];
    this.compare = compareFunc;
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  getParentIndex(i) {
    return (i - 1) >> 1;
  }

  push(val) {
    this.heap.push(val);

    this.bubbleUp();
  }

  bubbleUp() {
    let currentIdx = this.size() - 1;

    let parentIdx = this.getParentIndex(currentIdx);

    while (
      currentIdx > 0 &&
      this.compare(this.heap[currentIdx], this.heap[parentIdx])
    ) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = this.getParentIndex(currentIdx);
    }
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  size() {
    return this.heap.length;
  }

  pop() {
    const size = this.size();
    if (size === 0) return null;
    if (size === 1) return this.heap.pop();

    const root = this.heap[0];

    this.heap[0] = this.heap.pop();

    this.bubbleDown();

    return root;
  }

  bubbleDown() {
    let currentIdx = 0;
    const size = this.size();

    while (true) {
      const leftIdx = this.getLeftChildIndex(currentIdx);
      const rightIdx = this.getRightChildIndex(currentIdx);

      let smallestIdx = currentIdx;

      if (
        leftIdx < size &&
        this.compare(this.heap[leftIdx], this.heap[smallestIdx])
      ) {
        smallestIdx = leftIdx;
      }

      if (
        rightIdx < size &&
        this.compare(this.heap[rightIdx], this.heap[smallestIdx])
      ) {
        smallestIdx = rightIdx;
      }
      if (smallestIdx === currentIdx) break;

      this.swap(currentIdx, smallestIdx);
      currentIdx = smallestIdx;
    }
  }
}

// === 1. 단순 원시값 (숫자) 테스트 ===
console.log("=== 1. 단순 원시값 (숫자) 테스트 ===");

// 기본 비교 함수 (a < b)가 작동하도록 인자 없이 생성
const numHeap = new MinHeap();
const numbers = [5, 2, 8, 1, 9, 3];

console.log("들어간 순서:", numbers);

// 힙에 데이터 삽입
numbers.forEach((num) => numHeap.push(num));

const sortedNumbers = [];
// 힙이 빌 때까지 하나씩 빼서 배열에 담기
while (numHeap.size() > 0) {
  sortedNumbers.push(numHeap.pop());
}

console.log("나온 순서 (기대값: 1, 2, 3, 5, 8, 9):", sortedNumbers);
console.log("--------------------------------------------------\n");

// === 2. 객체 형태 테스트 (다익스트라 대비) ===
console.log("=== 2. 객체 형태 테스트 (비용 기준) ===");

// 다익스트라에서는 '비용(cost)'이 가장 작은 노드를 뽑아야 하므로,
// a.cost < b.cost 를 기준으로 하는 비교 함수를 넣어줍니다.
const objHeap = new MinHeap((a, b) => a.cost < b.cost);

const nodes = [
  { node: "A", cost: 5 },
  { node: "B", cost: 2 },
  { node: "C", cost: 8 },
  { node: "D", cost: 1 },
  { node: "E", cost: 4 },
];

console.log("들어간 데이터:");
console.dir(nodes);

// 힙에 객체 데이터 삽입
nodes.forEach((obj) => objHeap.push(obj));

const sortedNodes = [];
// 힙이 빌 때까지 하나씩 빼서 배열에 담기
while (objHeap.size() > 0) {
  sortedNodes.push(objHeap.pop());
}

console.log("\n나온 순서 (기대값: D(1) -> B(2) -> E(4) -> A(5) -> C(8)):");
console.dir(sortedNodes);
