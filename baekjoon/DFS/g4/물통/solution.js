const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(" ");

const [A, B, C] = input.map(Number);

const visited = Array.from({ length: 201 }, () => new Array(201).fill(false));
const result = new Array(201).fill(false);

const limits = [A, B, C];

function dfs(curr) {
  const [a, b, c] = curr;

  // 이미 탐색한 조합이면 종료.
  if (visited[a][b]) return;

  visited[a][b] = true;

  if (a === 0) {
    result[c] = true;
  }

  // 6가지 이동 경우의 수 (i: 주는 물통, j: 받는 물통)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === j) continue;

      const next = [a, b, c];
      // 옮길 수 있는 양 = (주는 물통의 물 양)과 (받는 물통의 남은 공간) 중 최소값
      const amount = Math.min(next[i], limits[j] - next[j]);

      next[i] -= amount;
      next[j] += amount;

      dfs(next);
    }
  }
}
dfs([0, 0, C]);

// 결과 정렬 및 출력
const output = [];
for (let i = 0; i <= C; i++) {
  if (result[i]) output.push(i);
}
console.log(output.join(" "));
