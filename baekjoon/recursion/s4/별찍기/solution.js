const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

const N = parseInt(input, 10);
const L = N * 4 - 3;

const grid = Array.from({ length: L }, () => Array(L).fill(" "));

function drawStar(n, x, y) {
  if (n === 1) {
    grid[y][x] = "*";
    return;
  }

  const curLen = 4 * n - 3;

  for (let i = 0; i < curLen; i++) {
    grid[y][x + i] = "*"; // 윗변
    grid[y + curLen - 1][x + i] = "*"; // 아랫변
    grid[y + i][x] = "*"; // 왼변
    grid[y + i][x + curLen - 1] = "*"; // 오른변
  }

  drawStar(n - 1, x + 2, y + 2);
}

drawStar(N, 0, 0);
console.log(grid.map((row) => row.join("")).join("\n"));
