const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
const numbers = input.slice(1)[0].split(" ").map(Number);

const M = Math.max(...numbers);

const sum = numbers.reduce((acc, cur) => acc + cur, 0);
const result = ((sum / M) * 100) / N;

console.log(result);
