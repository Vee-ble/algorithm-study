const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const N = Number(input[0]);
const K = Number(input[1]);

const positions = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solve(positions, N, K) {
  if (N <= K) return console.log(0);

  const diffDistance = new Array(N - 1);

  for (let i = 0; i < N - 1; i++) {
    diffDistance.push(positions[i + 1] - positions[i]);
  }

  diffDistance.sort((a, b) => b - a);
  const result = diffDistance.slice(K - 1).reduce((acc, cur) => acc + cur, 0);

  console.log(result);
}
solve(positions, N, K);
