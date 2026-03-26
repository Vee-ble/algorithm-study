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
