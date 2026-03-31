const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const N = input[0];

const conferences = input
  .slice(1, N + 1)
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => a[1] - b[1] || a[0] - a[0]);

let endTime = 0,
  count = 0;

for (let i = 0; i < N; i++) {
  const [confStartTime, confEndTime] = conferences[i];

  if (endTime <= confStartTime) {
    endTime = confEndTime;
    count++;
  } else continue;
}

console.log(count);
