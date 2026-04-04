const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

const [N, M] = input.split(" ").map(Number);
const current_sequence = [];

let result = "";

function dfs(start, depth) {
  if (depth === M) {
    result += current_sequence.join(" ") + "\n";
    return;
  }

  for (let i = start; i <= N; i++) {
    current_sequence.push(i);
    dfs(i, depth + 1);
    current_sequence.pop();
  }
}
dfs(1, 0);
console.log(result);
