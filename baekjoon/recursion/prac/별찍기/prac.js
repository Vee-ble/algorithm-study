const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);

const L = 4 * N - 3;
const grid = Array.from({ length: L }, () => Array(L).fill(" "));

function drawStar(n, p) {
  if (n === 1) {
    grid[p][p] = "*";
    return;
  }

  const curLen = 4 * n - 3;

  for (let i = 0; i < curLen; i++) {
    grid[p][p + i] = "*"; // 윗변
    grid[p + curLen - 1][p + i] = "*"; // 아랫변
    grid[p + i][p] = "*"; // 왼변
    grid[p + i][p + curLen - 1] = "*"; // 오른 변
  }

  drawStar(n - 1, p + 2);
}
drawStar(N, 0);
console.log(grid.map((row) => row.join("")).join("\n"));
