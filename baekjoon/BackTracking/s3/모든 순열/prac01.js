const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

const N = Number(input);

function solution(N) {
  const visited = Array(N + 1).fill(false);
  const curSequence = [];
  let result = "";

  function dfs() {
    if (curSequence.length === N) {
      result += curSequence.join(" ") + "\n";
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (!visited[i]) {
        visited[i] = true;
        curSequence.push(i);

        dfs();

        curSequence.pop();
        visited[i] = false;
      }
    }
  }

  dfs();

  console.log(result);
}
solution(N);
