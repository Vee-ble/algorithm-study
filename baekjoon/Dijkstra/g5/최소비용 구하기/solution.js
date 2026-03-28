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
