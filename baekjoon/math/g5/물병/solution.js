const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(" ");

let N = Number(input[0]);
const K = Number(input[1]);

let bought = 0;

while (true) {
  const oneCount = countBits(N);

  if (oneCount <= K) break;

  N++;
  bought++;
}

function countBits(num) {
  let count = 0;
  while (num > 0) {
    if (num & 1) count++;
    num >>= 1;
  }
  return count;
}

console.log(bought);
