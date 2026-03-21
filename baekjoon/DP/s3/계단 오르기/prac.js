const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const scores = input.slice(1).map(Number);

function solve() {
  if (N === 1) return scores[0];
  if (N === 2) return scores[0] + scores[1];

  let m3 = scores[0];
  let m2 = scores[0] + scores[1];
  let m1 = Math.max(scores[0] + scores[2], scores[1] + scores[2]);

  let currentMax = m1;

  for (let i = 3; i < N; i++) {
    currentMax = Math.max(m2 + scores[i], m3 + scores[i - 1] + scores[i]);

    m3 = m2;
    m2 = m1;
    m1 = currentMax;
  }

  return currentMax;
}

console.log(solve());
