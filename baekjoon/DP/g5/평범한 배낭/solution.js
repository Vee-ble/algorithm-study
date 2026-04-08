const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let idx = 0;
const [N, K] = input[idx++].split(" ").map(Number);
const items = [];

for (let i = 0; i < N; i++) {
  items.push(input[idx++].split(" ").map(Number));
}

const dp = Array(K + 1).fill(0);

for (let i = 0; i < N; i++) {
  let [w, v] = items[i];

  for (let curWeight = K; curWeight >= w; curWeight--) {
    dp[curWeight] = Math.max(dp[curWeight], dp[curWeight - w] + v);
  }
}
console.log(dp[K]);
