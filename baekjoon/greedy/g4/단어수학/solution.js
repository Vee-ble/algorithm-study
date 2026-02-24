const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);

const words = input.slice(1);

const alphMap = new Map();

for (let j = 0; j < N; j++) {
  const word = words[j];
  for (let i = 0; i < word.length; i++) {
    alphMap.set(
      word[i],
      (alphMap.get(word[i]) || 0) + 10 ** (word.length - i - 1),
    );
  }
}

const sorted = [...alphMap.entries()].sort((a, b) => b[1] - a[1]);

let sum = 0;
let position = 9;

for (const [key, val] of sorted) {
  sum += val * position;
  position--;
}
console.log(sum);
