const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, K] = input[0].split(" ").map(Number);
const list = input[1].split(" ").map(Number);

function solution(list, N, K) {
  if (K === N || N === 1) return console.log(0);
  if (K === 1) return console.log(list[list.length - 1] - list[0]);

  const elDiff = new Array(N - 1);

  for (let i = 0; i < N - 1; i++) {
    elDiff[i] = list[i + 1] - list[i];
  }

  elDiff.sort((a, b) => a - b);

  let result = 0;

  for (let j = 0; j < list.length - K; j++) {
    result += elDiff[j];
  }

  return console.log(result);
}
solution(list, N, K);
