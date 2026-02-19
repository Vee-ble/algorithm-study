const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const map = [];

for (let i = 1; i < input.length; i++) {
  map.push(input[i].split("").map(Number));
}

const directionR = [1, -1, 0, 0];
const directionC = [0, 0, 1, -1];

const visited = Array.from({ length: N }, () => Array(N).fill(false));

let count = 0;
const countSet = [];

function solution() {
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (visited[r][c] || map[r][c] !== 1) continue;

      count++;
      let partedCount = 0;
      const queue = [[r, c]];
      visited[r][c] = true;
      let head = 0;

      while (head < queue.length) {
        const [curR, curC] = queue[head++];
        partedCount++;

        for (let i = 0; i < 4; i++) {
          const nr = directionR[i] + curR;
          const nc = directionC[i] + curC;

          if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
            if (!visited[nr][nc] && map[nr][nc] === 1) {
              queue.push([nr, nc]);
              visited[nr][nc] = true;
            }
          }
        }
      }
      countSet.push(partedCount);
    }
  }
}
solution();

console.log(count);
console.log(countSet.sort((a, b) => a - b).join("\n"));
