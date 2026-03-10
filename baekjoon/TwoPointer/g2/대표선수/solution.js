const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);

let classes = [];

for (let i = 0; i < N; i++) {
  const arr = input[i + 1].split(" ").map(Number);
  arr.sort((a, b) => a - b);
  classes.push(arr);
}

let answer = Infinity;
const pointers = new Array(N).fill(0);
let maxVal = -Infinity;

for (let i = 0; i < N; i++) {
  maxVal = Math.max(maxVal, classes[i][0]);
}

while (true) {
  let minVal = Infinity;
  let minIdx = 0;

  for (let i = 0; i < N; i++) {
    const val = classes[i][pointers[i]];

    if (val < minVal) {
      minVal = val;
      minIdx = i;
    }
  }

  answer = Math.min(answer, maxVal - minVal);

  pointers[minIdx]++;

  if (pointers[minIdx] === classes[minIdx].length) break;
  else maxVal = Math.max(maxVal, classes[minIdx][pointers[minIdx]]);
}

console.log(answer);
