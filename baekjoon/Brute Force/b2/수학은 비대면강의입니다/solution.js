const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();
const [a, b, c, d, e, f] = input.split(" ").map(Number);

function solution(a, b, c, d, e, f) {
  const determinant = a * e - b * d;

  if (determinant === 0) return;

  const x = (e * c - b * f) / determinant;
  const y = (a * f - d * c) / determinant;

  console.log(x + " " + y);
}
solution(a, b, c, d, e, f);
