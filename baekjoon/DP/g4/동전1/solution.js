const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [n, k] = input[0].split(" ").map(Number);

const dp = new Float64Array(k + 1);

dp[0] = 1;

for (let i = 1; i <= n; i++) {
  const coin = Number(input[i]);

  if (coin > k) continue;

  for (let j = coin; j <= k; j++) {
    dp[j] += dp[j - coin];
  }
}

console.log(dp[k]);
