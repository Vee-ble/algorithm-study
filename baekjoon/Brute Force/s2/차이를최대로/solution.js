const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const inputArr = input[1].split(" ").map(Number);

let maxVal = 0;
const visited = new Array(N).fill(false);
const currentPermutation = [];

function dfs(depth) {
  // [Base Case] N개의 숫자를 모두 골랐을 때
  if (depth === N) {
    let currentSum = 0;
    for (let i = 0; i < N - 1; i++) {
      currentSum += Math.abs(currentPermutation[i] - currentPermutation[i + 1]);
    }
    maxVal = Math.max(maxVal, currentSum);
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      currentPermutation.push(inputArr[i]);

      dfs(depth + 1);

      currentPermutation.pop();
      visited[i] = false;
    }
  }
}

dfs(0);
console.log(maxVal);
