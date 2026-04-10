const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

class Heap {
  constructor(compare = (a, b) => a < b) {
    this.heap = [];
    this.compare = compare;
  }

  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  getLeftChildIdx(idx) {
    return idx * 2 + 1;
  }
  getRightChildIdx(idx) {
    return idx * 2 + 2;
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return root;
  }

  top() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parent = this.getParentIdx(index);

      if (this.compare(this.heap[index], this.heap[parent])) {
        [this.heap[index], this.heap[parent]] = [
          this.heap[parent],
          this.heap[index],
        ];
        index = parent;
      } else break;
    }
  }

  bubbleDown() {
    let index = 0;
    const size = this.heap.length;

    while (true) {
      let left = this.getLeftChildIdx(index);
      let right = this.getRightChildIdx(index);
      let target = index;

      if (left < size && this.compare(this.heap[left], this.heap[target]))
        target = left;

      if (right < size && this.compare(this.heap[right], this.heap[target]))
        target = right;

      if (target !== index) {
        [this.heap[index], this.heap[target]] = [
          this.heap[target],
          this.heap[index],
        ];
        index = target;
      } else break;
    }
  }
}

class MedianFinder {
  constructor() {
    this.maxHeap = new Heap((a, b) => a > b);
    this.minHeap = new Heap((a, b) => a < b);
  }

  add(num) {
    if (this.maxHeap.size() === this.minHeap.size()) {
      this.maxHeap.push(num);
    } else {
      this.minHeap.push(num);
    }

    if (this.minHeap.size() > 0 && this.maxHeap.top() > this.minHeap.top()) {
      const maxRoot = this.maxHeap.pop();
      const minRoot = this.minHeap.pop();

      this.maxHeap.push(minRoot);
      this.minHeap.push(maxRoot);
    }
  }

  getMedian() {
    return this.maxHeap.top();
  }
}

function solution() {
  const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

  const n = Number(input[0]);
  const mf = new MedianFinder();
  const result = [];

  for (let i = 1; i <= n; i++) {
    mf.add(Number(input[i]));
    result.push(mf.getMedian());
  }
  console.log(result.join("\n"));
}
solution();
