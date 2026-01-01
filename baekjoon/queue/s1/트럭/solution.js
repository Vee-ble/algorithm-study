const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const [n, w, L] = input[0].split(" ").map(Number);
const trucks = input[1].split(" ").map(Number);

let tp = 0;
let cost = 0;
let totalWeight = 0;
const bridge = Array(w).fill(0);

while (tp < n) {
  cost++;

  const exitedTruck = bridge.shift();
  totalWeight -= exitedTruck;

  if (totalWeight + trucks[tp] <= L) {
    bridge.push(trucks[tp]);
    totalWeight += trucks[tp];
    tp++;
  } else {
    bridge.push(0);
  }
}

console.log(cost + w);
