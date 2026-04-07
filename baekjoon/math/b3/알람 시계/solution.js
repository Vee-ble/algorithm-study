const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();
const [h, m] = input.split(" ").map(Number);
let totalTime = h * 60 + m - 45;

if (totalTime < 0) {
  totalTime += 24 * 60;
}

const calcH = Math.floor(totalTime / 60);
const calcM = totalTime % 60;

console.log(calcH + " " + calcM);
