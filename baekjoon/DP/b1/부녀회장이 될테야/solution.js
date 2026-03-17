const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = Number(input[0]);
let cursor = 1;

let apt = Array.from({ length: 15 }, () => Array(15).fill(0));

for (let i = 1; i < 15; i++) {
  apt[0][i] = i;
}

for (let k = 1; k < 15; k++) {
  for (let n = 1; n < 15; n++) {
    if (n === 1) {
      apt[k][n] = 1;
    } else {
      apt[k][n] = apt[k][n - 1] + apt[k - 1][n];
    }
  }
}

const results = [];
for (let i = 0; i < T; i++) {
  const K = Number(input[cursor++]);
  const N = Number(input[cursor++]);
  results.push(apt[K][N]);
}
console.log(results.join("\n"));
