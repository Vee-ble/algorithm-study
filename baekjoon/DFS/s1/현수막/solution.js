const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const [M, N] = input[0].split(" ").map(Number);
const banner = input.slice(1).map((el) => el.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

const visited = Array.from({ length: M }, () => Array(N).fill(false));

function foundChar(banner, M, N) {
  const stack = [];
  let count = 0;

  for (let r = 0; r < M; r++) {
    for (let c = 0; c < N; c++) {
      const p = banner[r][c];

      if (!visited[r][c] && p) {
        count++;
        stack.push([r, c]);
        visited[r][c] = true;
      }

      while (stack.length > 0) {
        const [r, c] = stack.pop();

        for (let [dr, dc] of directions) {
          const nr = dr + r;
          const nc = dc + c;

          if (nr >= 0 && nr < M && nc >= 0 && nc < N) {
            if (!visited[nr][nc] && banner[nr][nc]) {
              stack.push([nr, nc]);
              visited[nr][nc] = true;
            }
          }
        }
      }
    }
  }
  return count;
}

console.log(foundChar(banner, M, N));
