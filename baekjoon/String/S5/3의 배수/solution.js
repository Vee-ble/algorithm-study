const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

function solution(n) {
  let currentStr = n;
  let count = 0;

  while (currentStr.length > 1) {
    let sum = 0;

    for (let i = 0; currentStr.length > i; i++) {
      sum += parseInt(currentStr[i]);
    }

    currentStr = String(sum);
    count++;
  }
  console.log(count);
  if (parseInt(currentStr) % 3 === 0) {
    console.log("YES");
  } else {
    console.log("NO");
  }
}

solution(input);
