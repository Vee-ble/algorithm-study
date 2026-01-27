const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

const N = Number(input);

function solution(N) {
  let count = 1;
  let endNum = 666;

  while (count !== N) {
    endNum++;
    if (String(endNum).indexOf("666") !== -1) count++;
  }
  return endNum;
}

console.log(solution(N));
