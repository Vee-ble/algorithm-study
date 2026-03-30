const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = Number(input[0]);

for (let i = 1; i <= T; i++) {
  const [x1, y1, r1, x2, y2, r2] = input[i].trim().split(" ").map(Number);
  solution(x1, y1, r1, x2, y2, r2);
}

function solution(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const dSquare = dx * dx + dy * dy;

  const sum = (r1 + r2) ** 2;
  const diff = (r1 - r2) ** 2;

  const isOutSide = dSquare > sum; // 서로 멀리 떨어짐.
  const isInside = dSquare < diff; // 포함 (안만남)

  const isTangentOutside = dSquare === sum; // 외접
  const isTangentInside = dSquare === diff; // 내접

  const isIntersect = diff < dSquare && dSquare < sum; // 두 점에서 만남

  if (dSquare === 0 && r1 === r2) return console.log(-1);

  if (isOutSide || isInside) return console.log(0);

  if (isTangentOutside || isTangentInside) return console.log(1);

  if (isIntersect) return console.log(2);
}
