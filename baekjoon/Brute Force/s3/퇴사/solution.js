const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);

const T = [];
const P = [];

input.slice(1).forEach((item) => {
  const [t, p] = item.split(" ").map(Number);
  T.push(t);
  P.push(p);
});

let max_profit = 0;

function findMax(day, total_profit) {
  if (day === N + 1) {
    max_profit = Math.max(total_profit, max_profit);
    return;
  }

  if (day + T[day - 1] <= N + 1) {
    findMax(day + T[day - 1], total_profit + P[day - 1]);
  }

  findMax(day + 1, total_profit);
}

findMax(1, 0);
console.log(max_profit);
