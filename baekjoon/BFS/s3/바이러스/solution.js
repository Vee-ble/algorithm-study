const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const nodeCount = Number(input[0]);
const edgeCount = Number(input[1]);

const adj = Array.from({ length: nodeCount + 1 }, () => []);
for (let i = 2; i < 2 + edgeCount; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

const visited = new Array(nodeCount + 1).fill(false);
const queue = [1];
visited[1] = true;

let count = 0;

while (queue.length > 0) {
  const curr = queue.shift();

  for (const next of adj[curr]) {
    if (!visited[next]) {
      visited[next] = true;
      queue.push(next);
      count++;
    }
  }
}

console.log(count);
