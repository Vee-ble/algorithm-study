### **1. 요구사항 분석**

**요구사항 요약: 주어진 지도에서 가장 먼 최단거리를 가진 두 육지 사이의 시간을 구하라. 즉, 임의의 육지 A에서 B로 가는 최단 경로들 중 그 값이 최대가 되는 경우 찾기.**

**제약 사항(Constraints): 50 x 50 (칸의 개수 최대 2,500개).**

상하좌우 인접 육지만 가능

**입출력 예시 분석:**

- `(가상의 데이터가 입력부터 출력까지 어떻게 변환되는지 서술 또는 다이어그램으로 설명)`

**예외 케이스(Edge Case):**

- 지도가 전부 바다(w)인 경우
- 육지가 일직선인 경우. 한 칸만 있는 경우
- 육지가 섬처럼 떨어져 있는 경우

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

- 모든 육지를 시작점으로 잡고 각각 BFS 수행.
- 각 BFS에서 해당 시작점으로부터 갈 수 있는 가장 먼 육지까지의 거리
- 그 거리들 중 최댓값을 갱신하며 최종 결과를 출력함.

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 큐를 구현하고, 2차원 배열로 지도 저장 및 거리 기록

**Trade-off 분석:** dfs는 최단 거리를 보장하기 위해 모든 경로를 탐색해야하므로 비효율.

**예상 시간/공간 복잡도: O(L x (N x M)) 지도의 크기에 육지 만큼 더 연산함. (N x M)**

데이터 흐름 시각화: 지도 → 육지(L) 탐색 → 각 L에서 BFS 실행 → 거리 최댓값 갱신 → 최종 Max 출력

### 3. 의사코드 & 검증

```jsx
let maxDist = 0

for r of height
	for c of width
		if(map[r][c] === "L"):
				const queue = [[r,c,0]]
				const visited
				visited[r][c] = true

				while queue :
					const [r, c, dist] = queue.pop()
					maxDist = Math.max(maxDist, dist)

					for [dr, dc] of directions
						nr = dr + r
						nc = dc + c


						if(in_bounds and is_land and not visited)
							visited = true
							queue.push([nr,nc,dist +1])


```

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [h, w] = input[0].split(" ").map(Number);
const map = [];

for (let i = 1; i < input.length; i++) {
  map.push(input[i]);
}
function solution(h, w, map) {
  let maxDist = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (map[r][c] === "L") {
        const visited = Array.from({ length: h }, () => Array(w).fill(-1));
        const queue = [[r, c]];
        visited[r][c] = 0;

        let head = 0;
        while (head < queue.length) {
          const [currR, currC] = queue[head++];
          maxDist = Math.max(maxDist, visited[currR][currC]);

          for (let [dr, dc] of directions) {
            const nr = currR + dr;
            const nc = currC + dc;

            if (
              nr >= 0 &&
              nr < h &&
              nc >= 0 &&
              nc < w &&
              visited[nr][nc] === -1 &&
              map[nr][nc] === "L"
            ) {
              visited[nr][nc] = visited[currR][currC] + 1;
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }
  return maxDist;
}
console.log(solution(h, w, map));
```

**최적화된 코드**

```jsx
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
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**1. 발생한 문제 (Trouble)**

- **자바스크립트 V8 엔진 최적화 파괴 (Type Mixing):** 깊은 복사한 `newArr`는 초기에 문자열(`'L'`, `'W'`)을 담고 있었으나, 거리 계산을 위해 배열 내부에 숫자(Number)를 덮어씌움. 배열 내에 여러 타입이 혼용되면서 V8 엔진의 히든 클래스(Hidden Class) 최적화가 깨지고 성능 저하(De-optimization)를 유발함.
- **큐 연산 지연:** BFS 내부에서 큐의 선입선출을 위해 `queue.shift()`를 사용하여, 매 연산마다 O(K)의 배열 재정렬 비용이 발생함.

**2. 해결 과정 (Shooting)**

- **방문 식별자(Generation ID) 기법 도입:** 무거운 2차원 배열 복사나 초기화 대신, 전역에 `visited` 배열을 단 한 번만 생성함. 매 BFS 탐색마다 `visitId` 변수를 1씩 증가시키고, 해당 식별자로 방문 여부를 체크함(`visited[nr][nc] === visitId`). 이로써 방문 배열 초기화 비용을 O(1)로 완벽히 단축함.
- **타입 분리 및 TypedArray 활용:** 상태 기록(거리)은 배열에 직접 덮어씌우지 않고 큐에 좌표와 함께(`[r, c, dist]`) 저장하여 전달함. 또한, `visited` 배열은 자바스크립트의 일반 배열 대신 C언어 배열처럼 동작하여 메모리 효율이 극대화되는 `Int32Array`를 사용하여 성능을 크게 끌어올림.
- **포인터 큐(Pointer Queue) 적용:** `shift()` 대신 `head` 변수를 인덱스 포인터로 사용하여 O(1)의 시간 복잡도로 데이터를 꺼내오도록 최적화함.

**3. 새롭게 알게 된 점**

- **휴리스틱(Heuristic) 탐색 최적화:** 모든 육지에서 시작하지 않고, "최단 거리 중 최댓값은 결국 육지의 끝(가장자리)에서 나온다"는 직관을 코드로 구현(`isEdgeLand` 함수). 상하좌우 중 바다와 접한 칸에서만 BFS를 실행하게 하여, 불필요한 내부 육지 탐색 횟수를 획기적으로 줄이는 논리적 최적화를 직접 경험함.
- **언어의 동작 원리와 성능의 관계:** 알고리즘의 시간 복잡도(Big-O)가 같더라도, 자바스크립트 엔진이 메모리를 할당하고 배열 타입을 관리하는 내부 원리를 모르면 실무나 코딩 테스트에서 심각한 병목(Bottleneck)이 발생할 수 있다는 점을 깊이 깨달음.

**4. 아쉬운 점 & 리팩토링 계획**

- **단일 책임 원칙(SRP) 적용:** 초기 코드에서는 이중 루프 안에 탐색 조건, 복사 로직, BFS 로직이 모두 섞여 있어 가독성이 낮고 들여쓰기 깊이(Depth)가 깊었음. 리팩토링을 통해 가장자리 판별(`isEdgeLand`)과 BFS 탐색(`bfs`)을 독립적인 함수로 분리하여 유지보수성과 코드의 목적성을 명확히 함.
