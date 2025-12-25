const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

for (let i = 1; i < input.length; i++) {
  const s = input[i];
  if (s === "P=NP") console.log("skipped");
  else {
    const sum = s.split("+").reduce((acc, cur) => acc + Number(cur), 0);
    console.log(sum);
  }
}
