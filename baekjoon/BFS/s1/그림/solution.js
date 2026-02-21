const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i < input.length; i++) {
  board.push(input[i].split(" ").map(Number));
}

const visited = Array.from({ length: n }, () => Array(m).fill(false));
let totalPainting = 0,
  maxPainting = 0;

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function solution() {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (visited[r][c] || board[r][c] === 0) continue;

      let head = 0;
      let localCount = 0;
      totalPainting++;

      const queue = [[r, c]];
      visited[r][c] = true;
      localCount++;

      while (head < queue.length) {
        const [cr, cc] = queue[head++];

        for (let [dr, dc] of directions) {
          const nr = dr + cr;
          const nc = dc + cc;

          if (
            nr >= 0 &&
            nr < n &&
            nc >= 0 &&
            nc < m &&
            !visited[nr][nc] &&
            board[nr][nc] === 1
          ) {
            queue.push([nr, nc]);
            visited[nr][nc] = true;
            localCount++;
          }
        }
      }
      maxPainting = Math.max(maxPainting, localCount);
    }
  }
}
solution();

console.log(totalPainting + "\n" + maxPainting);
