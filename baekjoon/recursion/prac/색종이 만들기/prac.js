const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const N = Number(input[0]);
const paper = input.slice(1).map((row) => row.split(" ").map(Number));

function solution() {
  let counts = [0, 0];

  function recursion(n, x, y) {
    const firstColor = paper[y][x];

    for (let r = y; r < y + n; r++) {
      for (let c = x; c < x + n; c++) {
        if (firstColor !== paper[r][c]) {
          const half = n / 2;

          recursion(half, x, y);
          recursion(half, x + half, y);
          recursion(half, x, y + half);
          recursion(half, x + half, y + half);

          return;
        }
      }
    }
    counts[firstColor] += n * n;
  }

  recursion(N, 0, 0);
  return counts;
}
console.log(solution());
