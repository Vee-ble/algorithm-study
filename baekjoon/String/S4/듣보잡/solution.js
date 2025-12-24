const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const N = +input[0].split(" ")[0];

const nameMap = new Map();
const result = [];

for (let i = 1; i < input.length; i++) {
  const name = input[i];

  if (i <= N) nameMap.set(name, 1);
  else if (nameMap.has(name)) result.push(name);
}
console.log(
  result.length + "\n" + result.sort((a, b) => a.localeCompare(b)).join("\n")
);
