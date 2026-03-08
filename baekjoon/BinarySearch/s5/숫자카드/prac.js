const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const myNums = new Set(input[1].split(" ").map(Number));
const M = Number(input[2]);
const nums = input[3].split(" ").map(Number);
const results = [];

for (let i = 0; i < M; i++) {
  if (myNums.has(nums[i])) {
    results.push(1);
  } else {
    results.push(0);
  }
}

console.log(results.join(" "));
