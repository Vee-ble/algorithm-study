const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = input[0];

let outputBuffer = "";
for (let i = 1; i <= T; i++) {
  const S = input[i];
  solution(S);
}

function solution(S) {
  const cStack = [];
  const uStack = [];
  let totalCost = 0;
  let brickets = [];

  for (let c of S) {
    if (c === "C") {
      totalCost += 2;
    } else {
      totalCost += 1;
    }
    brickets.push(")");
  }

  let balance = 0;
  for (let j = 0; j < brickets.length; j++) {
    S[j] === "C" ? cStack.push(j) : uStack.push(j);

    if (brickets[j] === ")") balance--;

    if (balance < 0) {
      let index;
      if (cStack.length > 0) {
        index = cStack.pop();
        totalCost -= 2;
      } else {
        index = uStack.pop();
      }
      brickets[index] = "(";
      balance += 2;
    }
  }
  outputBuffer += `${totalCost}\n${brickets.join("")}\n`;
}
console.log(outputBuffer);
