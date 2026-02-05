const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);
const cards = input[1].split(" ").map(Number);

let maxSum = 0;

function pick(index, count, currentSum) {
  if (count === 3) {
    if (currentSum <= M) {
      maxSum = Math.max(maxSum, currentSum);
    }
    return;
  }
  if (index >= N) {
    return;
  }

  // 3. 재귀 호출 (현재 카드를 포함하는 경우 vs 포함하지 않는 경우)

  if (currentSum + cards[index] <= M) {
    pick(index + 1, count + 1, currentSum + cards[index]);
  }
  pick(index + 1, count, currentSum);
}

pick(0, 0, 0);

console.log(maxSum);
