const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);

const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);

function solution(aArr, bArr) {
  if (aArr.length === 0 && bArr.length === 0) {
    return 0;
  }

  let minValA = Infinity;
  let minIdxA = 0;

  let maxValB = -Infinity;
  let maxIdxB = 0;

  for (let i = 0; i < aArr.length; i++) {
    const a = aArr[i];
    const b = bArr[i];

    if (a < minValA) {
      minValA = a;
      minIdxA = i;
    }

    if (b > maxValB) {
      maxValB = b;
      maxIdxB = i;
    }
  }

  const currentResult = minValA * maxValB;

  aArr.splice(minIdxA, 1);
  bArr.splice(maxIdxB, 1);

  return currentResult + solution(aArr, bArr);
}
console.log(solution(A, B));
