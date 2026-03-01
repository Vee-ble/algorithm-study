const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const lectures = input.slice(1);

const N = Number(input[0]);
const starts = [];
const ends = [];

for (let i = 0; i < N; i++) {
  const [start, end] = lectures[i].split(" ").map(Number);

  starts.push(start);
  ends.push(end);
}

starts.sort((a, b) => a - b);
ends.sort((a, b) => a - b);

let lectureRoom = 0;
let endPointer = 0;

for (let i = 0; i < N; i++) {
  if (starts[i] < ends[endPointer]) {
    lectureRoom++;
  } else {
    endPointer++;
  }
}

console.log(lectureRoom);
