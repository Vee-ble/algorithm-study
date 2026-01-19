const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);

function solution(n) {
  if (n < 100) return n;

  let count = 99;

  for (let i = 100; i <= n; i++) {
    const hundreds = Math.floor(i / 100);
    const tens = Math.floor((i / 10) % 10);
    const ones = i % 10;
    if (tens - hundreds === ones - tens) count++;
  }
  return count;
}

console.log(solution(N));
