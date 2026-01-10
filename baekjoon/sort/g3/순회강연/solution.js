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
