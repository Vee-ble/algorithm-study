const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = Number(input[0]);

const dp = new Array(12);
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 0; i < T; i++) {
  const n = Number(input[i + 1]);

  for (let j = 4; j <= n; j++) {
    dp[j] = dp[j - 1] + dp[j - 2] + dp[j - 3];
  }
  console.log(dp[n]);
}
