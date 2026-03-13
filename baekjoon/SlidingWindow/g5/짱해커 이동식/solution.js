const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, K] = input[0].split(" ").map(Number);
const costs = input[1].split(" ").map(Number);

let start = 0;
let end = K - 1;
let max = 0;

if (K === 1) {
  console.log(Math.max(...costs));
  return;
} else {
  while (end < N) {
    let min = Infinity;
    let minIdx = -1;

    for (let i = start; i <= Math.min(end, N - 1); i++) {
      if (costs[i] <= min) {
        min = costs[i];
        minIdx = i;
      }
    }

    max = Math.max(max, min);
    start = minIdx + 1;
    end = minIdx + K;
  }
  console.log(max);
}
