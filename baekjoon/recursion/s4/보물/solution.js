const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);

function getMinS(arrA, arrB) {
  // base case
  if (arrA.length === 0 && arrB.length === 0) return 0;

  let minIndexA = 0;
  let minValueA = Infinity;

  let maxIndexB = 0;
  let maxValueB = -Infinity;

  for (let i = 0; i < arrA.length; i++) {
    const a = arrA[i];
    const b = arrB[i];
    if (a < minValueA) {
      minIndexA = i;
      minValueA = a;
    }

    if (b > maxValueB) {
      maxIndexB = i;
      maxValueB = b;
    }
  }

  const curValue = minValueA * maxValueB;

  const nextA = arrA.filter((_, i) => i !== minIndexA);
  const nextB = arrB.filter((_, i) => i !== maxIndexB);

  return curValue + getMinS(nextA, nextB);
}

console.log(getMinS(A, B));
