const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [h, w] = input[0].split(" ").map(Number);
const map = [];

for (let i = 1; i < input.length; i++) {
  map.push(input[i]);
}
function solution(h, w, map) {
  let maxDist = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (map[r][c] === "L") {
        const visited = Array.from({ length: h }, () => Array(w).fill(-1));
        const queue = [[r, c]];
        visited[r][c] = 0;

        let head = 0;
        while (head < queue.length) {
          const [currR, currC] = queue[head++];
          maxDist = Math.max(maxDist, visited[currR][currC]);

          for (let [dr, dc] of directions) {
            const nr = currR + dr;
            const nc = currC + dc;

            if (
              nr >= 0 &&
              nr < h &&
              nc >= 0 &&
              nc < w &&
              visited[nr][nc] === -1 &&
              map[nr][nc] === "L"
            ) {
              visited[nr][nc] = visited[currR][currC] + 1;
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }
  return maxDist;
}
console.log(solution(h, w, map));
