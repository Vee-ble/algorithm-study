const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const result = new Array(N).fill(-1);

const stack = [];
for (let i = N - 1; i >= 0; i--) {
  const current = A[i];

  while (stack.length > 0 && stack[stack.length - 1] <= current) {
    stack.pop();
  }
  if (stack.length > 0) {
    result[i] = stack[stack.length - 1];
  }
  stack.push(current);
}
console.log(result.join(" "));
