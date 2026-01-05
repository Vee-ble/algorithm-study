const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let cursor = 0;

const T = Number(input[cursor++]);

for (let i = 0; i < T; i++) {
  let result = 1;
  const n = Number(input[cursor++]);

  const clothesMap = new Map();

  for (let j = 0; j < n; j++) {
    const line = input[cursor++];

    const [name, type] = line.split(" ");

    clothesMap.set(type, (clothesMap.get(type) || 0) + 1);
  }
  for (let val of clothesMap.values()) {
    result *= val + 1;
  }
  console.log(result - 1);
}
