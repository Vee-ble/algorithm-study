const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return max;
  }
  isEmpty() {
    return this.heap.length === 0;
  }

  getParentIdx(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChildIdx(index) {
    return 2 * index + 1;
  }
  getRightChildIdx(index) {
    return 2 * index + 2;
  }

  bubbleUp(index) {
    while (index > 0) {
      let parentIdx = this.getParentIdx(index);
      if (this.heap[parentIdx] > this.heap[index]) break;

      [this.heap[parentIdx], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIdx],
      ];
      index = parentIdx;
    }
  }
  size() {
    return this.heap.length;
  }

  bubbleDown(index) {
    const size = this.size();

    while (true) {
      const leftIdx = this.getLeftChildIdx(index);
      const rightIdx = this.getRightChildIdx(index);
      let largestIdx = index;

      if (leftIdx < size && this.heap[leftIdx] > this.heap[largestIdx]) {
        largestIdx = leftIdx;
      }
      if (rightIdx < size && this.heap[rightIdx] > this.heap[largestIdx]) {
        largestIdx = rightIdx;
      }

      if (largestIdx === index) break;

      [this.heap[largestIdx], this.heap[index]] = [
        this.heap[index],
        this.heap[largestIdx],
      ];
      index = largestIdx;
    }
  }
}

function solution() {
  const N = Number(input[0]);

  let dasom = Number(input[1]);

  if (N === 1) {
    console.log(0);
    return;
  }

  const pq = new MaxHeap();

  for (let i = 2; i <= N; i++) {
    pq.push(Number(input[i]));
  }

  let bribeCount = 0;

  while (!pq.isEmpty()) {
    let maxVotes = pq.pop();

    if (maxVotes < dasom) break;

    dasom += 1;
    maxVotes -= 1;
    bribeCount += 1;

    pq.push(maxVotes);
  }
  console.log(bribeCount);
}

solution();
