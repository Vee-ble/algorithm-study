const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);

const BSet = new Set(B);

let result = [];

for (let i = 0; i < A.length; i++) {
  const aEl = A[i];
  if (!BSet.has(aEl)) {
    result.push(aEl);
  }
}

if (result.length === 0) {
  console.log("0");
} else {
  console.log(`${result.length}\n${result.sort((a, b) => a - b).join(" ")}`);
}
