const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const N = Number(input[0]);
const board = input.slice(1).map((line) => line.split(""));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function getPartitionCount(currentBoard) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let count = 0;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!visited[r][c]) {
        count++;
        let stack = [[r, c]];
        visited[r][c] = true;
        const color = currentBoard[r][c];

        while (stack.length > 0) {
          const [currR, currC] = stack.pop();

          for (let [dr, dc] of directions) {
            const nr = currR + dr;
            const nc = currC + dc;

            if (nr >= 0 && nr < N && nc >= 0 && nc < N && !visited[nr][nc]) {
              if (currentBoard[nr][nc] === color) {
                visited[nr][nc] = true;
                stack.push([nr, nc]);
              }
            }
          }
        }
      }
    }
  }
  return count;
}

// 1. 일반인 기준 계산
const normalCount = getPartitionCount(board);

// 2. 적록색약용 보드로 변경 (G를 R로 통일)
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === "G") board[i][j] = "R";
  }
}

const colorBlindCount = getPartitionCount(board);

console.log(`${normalCount} ${colorBlindCount}`);
