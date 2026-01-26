const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const [N, M] = input[0].split(" ").map(Number);
const cards = input[1].split(" ").map(Number);

function solution(N, M, cards) {
  let maxSum = 0;

  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      for (let k = j + 1; k < N; k++) {
        sum = cards[i] + cards[j] + cards[k];

        if (sum <= M && maxSum < sum) maxSum = sum;

        if (maxSum === M) return maxSum;
      }
    }
  }
  return maxSum;
}

console.log(solution(N, M, cards));
