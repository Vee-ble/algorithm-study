const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const string = fs.readFileSync(filePath).toString().trim();

function solution(string) {
  const N = string.length;
  const k = string.split("a").length - 1;

  if (k <= 1) return 0;

  let start = 0;
  let end = k - 1;
  let maxChar = 0;
  let window = 0;

  for (let i = 0; i < k; i++) {
    if (string[i] === "a") {
      window++;
    }
  }

  while (start < N) {
    if (string[start++] === "a") window--;
    if (string[++end % N] === "a") window++;

    maxChar = Math.max(window, maxChar);
  }

  return k - maxChar;
}
console.log(solution(string));
