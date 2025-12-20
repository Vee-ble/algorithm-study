const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = parseInt(input[0]);

for (let i = 1; i <= T; i++) {
  const [x1, y1, r1, x2, y2, r2] = input[i].trim().split(" ").map(Number);
  solution(x1, y1, r1, x2, y2, r2);
}

function solution(x1, y1, r1, x2, y2, r2) {
  const distanceSquared = (x1 - x2) ** 2 + (y1 - y2) ** 2;
  const addRPow = (r1 + r2) ** 2;
  const subRPow = (r1 - r2) ** 2;

  if (distanceSquared === 0 && r1 === r2) {
    console.log(-1);
  } else if (distanceSquared === addRPow || distanceSquared === subRPow) {
    console.log(1);
  } else if (distanceSquared > addRPow || distanceSquared < subRPow) {
    console.log(0);
  } else {
    console.log(2);
  }
}
