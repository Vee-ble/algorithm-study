const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const globalN = Number(input[0]);
const paper = input.slice(1).flatMap((row) => row.split(" ").map(Number));

function solution() {
  const counts = [0, 0];

  function recursion(size, r, c) {
    const firstColor = paper[r * globalN + c];

    for (let i = 0; i < size; i++) {
      const rowStartIndex = (r + i) * globalN;

      for (let j = 0; j < size; j++) {
        if (paper[rowStartIndex + (c + j)] !== firstColor) {
          const half = size / 2;

          recursion(half, r, c);
          recursion(half, r, c + half);
          recursion(half, r + half, c);
          recursion(half, r + half, c + half);

          return;
        }
      }
    }

    counts[firstColor]++;
  }

  recursion(globalN, 0, 0);
  console.log(`${counts[0]}\n${counts[1]}`);
}

solution();
