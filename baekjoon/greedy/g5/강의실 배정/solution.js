const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const starts = [];
const ends = [];

for (let i = 1; i <= N; i++) {
  const [s, e] = input[i].split(" ").map(Number);
  starts.push(s);
  ends.push(e);
}

starts.sort((a, b) => a - b);
ends.sort((a, b) => a - b);

let lectureRoom = 0;
let endPointer = 0;

for (let i = 0; i < N; i++) {
  // 현재 가장 빨리 끝나는 수업보다 다음 수업 시작 시간이 빠르면?
  if (starts[i] < ends[endPointer]) {
    lectureRoom++;
  } else {
    endPointer++;
  }
}

console.log(lectureRoom);
