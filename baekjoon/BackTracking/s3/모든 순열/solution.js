const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

const N = Number(input);
const visited = new Array(N + 1).fill(false);
const cur_sequence = [];

let result = "";

function dfs(depth) {
  if (depth === N) {
    result += cur_sequence.join(" ") + "\n";
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      cur_sequence.push(i);

      dfs(depth + 1);

      cur_sequence.pop();
      visited[i] = false;
    }
  }
}
dfs(0);

console.log(result);
