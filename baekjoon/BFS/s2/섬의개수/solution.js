const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1], // 상하좌우
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1], // 대각선 4방향 추가
];

let line = 0;

while (line < input.length) {
  const [w, h] = input[line].split(" ").map(Number);
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  const queue = [];
  let count = 0;

  if (w === 0 && h === 0) break;

  line++;

  const map = [];
  for (let i = 0; i < h; i++) {
    map.push(input[line].split(" ").map(Number));
    line++;
  }

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (visited[r][c]) continue;

      const status = map[r][c];
      if (status === 1) {
        queue.push([r, c]);
        visited[r][c] = true;
        count++;
      }

      while (queue.length > 0) {
        const [r, c] = queue.shift();

        for (let [dr, dc] of directions) {
          const nr = dr + r;
          const nc = dc + c;

          if (nr < h && nr >= 0 && nc < w && nc >= 0 && !visited[nr][nc]) {
            if (map[nr][nc] === 1) {
              queue.push([nr, nc]);
              visited[nr][nc] = true;
            }
          }
        }
      }
    }
  }
  console.log(count);
}
