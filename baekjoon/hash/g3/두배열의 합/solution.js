const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = Number(input[0]);
const A = input[2].split(" ").map(Number);
const B = input[4].split(" ").map(Number);

let answer = 0;
const mapB = new Map();

for (let i = 0; i < B.length; i++) {
  let sum = 0;
  for (let j = i; j < B.length; j++) {
    sum += B[j];
    mapB.set(sum, (mapB.get(sum) || 0) + 1);
  }
}

for (let i = 0; i < A.length; i++) {
  let sum = 0;
  for (let j = i; j < A.length; j++) {
    sum += A[j];

    const target = T - sum;

    if (mapB.has(target)) {
      answer += mapB.get(target);
    }
  }
}

console.log(answer);
