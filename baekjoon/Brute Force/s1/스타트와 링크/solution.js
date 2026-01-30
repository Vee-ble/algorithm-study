const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const N = Number(input[0]);
const half = N / 2;

const capacity = input.slice(1).map((el) => el.split(" ").map(Number));

let start = [0]; // start 팀
let link = []; // link 팀
let minSum = Infinity; // 합의 최솟값

const visited = new Array(N + 1).fill(false);
visited[0] = true;

function dfs(start_Node, depth) {
  if (depth === half) {
    let startSum = 0;
    let linkSum = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // i와 j가 둘 다 true면 스타트 팀 시너지
        if (visited[i] && visited[j]) startSum += capacity[i][j];
        // i와 j가 둘 다 false면 링크 팀 시너지
        else if (!visited[i] && !visited[j]) linkSum += capacity[i][j];
      }
    }
    minSum = Math.min(minSum, Math.abs(startSum - linkSum));
    return;
  }

  for (let i = start_Node; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      start.push(i);
      dfs(i + 1, depth + 1);
      start.pop();
      visited[i] = false;
    }
  }
}
dfs(1, 1);
console.log(minSum);
