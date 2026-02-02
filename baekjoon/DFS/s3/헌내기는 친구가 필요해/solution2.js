const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);
let startR, startC;

const campus = input.slice(1).map((el, i) => {
  const findI = el.indexOf("I");
  if (findI !== -1) {
    startR = i; // 행 (y축)
    startC = findI; // 열 (x축)
  }
  return el.split("");
});
const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const visited = Array.from({ length: N }, () => Array(M).fill(false));
let count = 0;

function solution(r, c) {
  const stk = [[r, c]];
  visited[r][c] = true;

  while (stk.length > 0) {
    const [cr, cc] = stk.pop();

    if (campus[cr][cc] === "P") {
      count++;
    }

    for (let [dr, dc] of directions) {
      const nr = cr + dr;
      const nc = cc + dc;

      // N은 행(row)의 개수, M은 열(col)의 개수.
      if (nr >= 0 && nr < N && nc >= 0 && nc < M) {
        if (!visited[nr][nc] && campus[nr][nc] !== "X") {
          visited[nr][nc] = true;
          stk.push([nr, nc]);
        }
      }
    }
  }
}
solution(startR, startC);
console.log(count === 0 ? "TT" : count);
