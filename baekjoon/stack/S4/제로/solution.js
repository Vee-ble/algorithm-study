const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const k = input[0];
const stk = [];
let sum = 0;

for (let i = 1; i <= k; i++) {
  const c = input[i];
  if (c === "0") {
    sum -= stk.pop();
  } else {
    const num = Number(c);
    stk.push(num);
    sum += num;
  }
}
console.log(sum);
