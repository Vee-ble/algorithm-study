const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);
let I = [];

const campus = input.slice(1).map((el, i) => {
  const findI = el.indexOf("I");
  if (findI !== -1) {
    I = [i, findI];
  }
  return el.split("");
});
const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
]; // 상하좌우

const [x, y] = I;
const visited = Array.from({ length: N }, () => Array(M).fill(false));
visited[y][x] = true;

let count = 0;

function dfs(x, y, info) {
  if (info === "X") return;
  if (info === "P") {
    count++;
  }

  for (let [dy, dx] of directions) {
    const cx = x + dx;
    const cy = y + dy;

    if (cx >= 0 && cy >= 0 && cx < M && cy < N) {
      if (!visited[cy][cx]) {
        visited[cy][cx] = true;
        dfs(cx, cy, campus[cy][cx]);
      }
    }
  }
}
dfs(x, y, campus[y][x]);
console.log(count === 0 ? "TT" : count);
