const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const scores = input.slice(1).map(Number);

if (N === 1) {
  console.log(scores[0]);
  return;
}
if (N === 2) {
  console.log(scores[0] + scores[1]);
  return;
}
if (N === 3) {
  console.log(Math.max(scores[0] + scores[2], scores[1] + scores[2]));
  return;
}

let dp_i_3 = scores[0];
let dp_i_2 = scores[0] + scores[1];
let dp_i_1 = Math.max(scores[0] + scores[2], scores[1] + scores[2]);
let prevScore = scores[2];

for (let i = 3; i < N; i++) {
  const curScore = scores[i];

  const curMaxScore = Math.max(
    dp_i_2 + curScore,
    dp_i_3 + prevScore + curScore,
  );

  prevScore = curScore;
  dp_i_3 = dp_i_2;
  dp_i_2 = dp_i_1;
  dp_i_1 = curMaxScore;
}

console.log(dp_i_1);
