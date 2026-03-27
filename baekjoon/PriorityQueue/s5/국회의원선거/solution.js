const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

console.log(input);

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._sinkDown(0);
    return max;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _bubbleUp(index) {
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);
      if (this.heap[parentIdx] >= this.heap[index]) break;

      [this.heap[parentIdx], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIdx],
      ];
      index = parentIdx;
    }
  }

  _sinkDown(index) {
    const length = this.heap.length;
    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let largestIdx = index;

      if (leftIdx < length && this.heap[leftIdx] > this.heap[largestIdx]) {
        largestIdx = leftIdx;
      }
      if (rightIdx < length && this.heap[rightIdx] > this.heap[largestIdx]) {
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
  if (input.length === 0 || isNaN(input[0])) return;

  const n = input[0];
  let dasom = input[1];

  if (n === 1) {
    console.log(0);
    return;
  }

  const pq = new MaxHeap();
  for (let i = 2; i <= n; i++) {
    pq.push(input[i]);
  }

  let bribeCount = 0;

  while (!pq.isEmpty()) {
    let maxVotes = pq.pop();

    if (dasom > maxVotes) {
      break;
    }

    dasom += 1;
    maxVotes -= 1;
    bribeCount += 1;

    pq.push(maxVotes);
  }

  console.log(bribeCount);
}

solution();
