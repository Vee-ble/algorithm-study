const fs = require("fs");
const path = require("path");

const LAND = "L";
const SEA = "W";
const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function solve() {
  const filePath =
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "input.txt");
  const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

  const [h, w] = input[0].split(" ").map(Number);
  const map = [];
  for (let i = 1; i <= h; i++) {
    map.push(input[i]);
  }

  // 프로그램 전체에서 단 한 번만 할당
  // 일반 Array 대신 V8 엔진에서 성능이 극대화되는 TypedArray(Int32Array) 사용
  const visited = Array.from({ length: h }, () => new Int32Array(w));

  let maxVal = 0;
  let visitId = 0;

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      // 육지이면서, 바다와 인접한 '가장자리'인 경우에만 탐색 시작
      if (map[r][c] === LAND && isEdgeLand(r, c, h, w, map)) {
        visitId++; // 새로운 탐색마다 ID 갱신
        const currentMaxDist = bfs(r, c, h, w, map, visited, visitId);
        maxVal = Math.max(maxVal, currentMaxDist);
      }
    }
  }

  console.log(maxVal);
}

/**
 * 해당 좌표가 탐색을 시작할 가치가 있는 '가장자리 육지'인지 판별.
 */
function isEdgeLand(r, c, h, w, map) {
  // 지도의 테두리(가장자리)에 위치해 있다면 무조건 시작점 후보
  if (r === 0 || r === h - 1 || c === 0 || c === w - 1) return true;

  // 상하좌우 중 바다(SEA)와 한 면이라도 접해 있다면 시작점 후보
  for (const [dr, dc] of DIRECTIONS) {
    const nr = r + dr;
    const nc = c + dc;
    if (map[nr][nc] === SEA) return true;
  }

  return false; // 내륙 깊숙한 육지는 탐색 패스
}

/**
 * 주어진 시작점에서 BFS를 수행하고 도달할 수 있는 가장 먼 거리를 반환.
 */
function bfs(startR, startC, h, w, map, visited, visitId) {
  const queue = [[startR, startC, 0]];
  visited[startR][startC] = visitId;

  let head = 0;
  let maxDist = 0;

  while (head < queue.length) {
    const [r, c, dist] = queue[head++];
    maxDist = Math.max(maxDist, dist);

    for (const [dr, dc] of DIRECTIONS) {
      const nr = r + dr;
      const nc = c + dc;

      // 지도 범위 내에 있고 육지이며 '이번 탐색(visitId)'에서 아직 방문하지 않은 곳
      if (nr >= 0 && nr < h && nc >= 0 && nc < w) {
        if (map[nr][nc] === LAND && visited[nr][nc] !== visitId) {
          visited[nr][nc] = visitId;
          queue.push([nr, nc, dist + 1]);
        }
      }
    }
  }

  return maxDist;
}

solve();
