### **1. 요구사항 분석**

**요구사항 요약:**

캠퍼스는 N x M 크기이며, 상하좌우로 이동할 수 있다.

1 ≤ N ≤ 600, 1 ≤ M ≤ 600

O는 빈 공간, X는 벽, I는 도연이, P는 사람

도연이가 만날 수 있는 사람의 수 출력.

**제약 사항(Constraints): 아무도 만나지 못하면 TT 출력**

**예외 케이스(Edge Case):**

-

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** DFS를 이용한 구현

1. info, row, col 값을 매개변수로 받는다.
2. info가 X라면 종료. P라면 count 증가 후 종료
3. for(let [상,하,좌,우] of diresctions)
   1. visited로 이미 갔던 곳은 건너 띈다.
   2. 상하좌우 이동을 적용한 현재 좌표를 구한 뒤, 재귀 호출한다.

**선택한 자료구조 근거:**

- 선택: diresctions 배열
- 이유: loop하여 이동된 상하좌우 좌표를 구한다.

**예상 시간/공간 복잡도: 사실상 모든 2차원 배열을 탐색 하기에 O(NxM), visited 사용시 O(NxM)**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
input을 가공하는 과정에서 I 좌표를 미리 찾아둔다.
const I = [x값, y값]
const [x, y] = I
const directions = [[1, 0], [-1,0], [0,-1],[0,1]] // 상하좌우
const visited = false로 채워진 N x M 크기의 2차원 배열
I 좌표는 visited true

function dfs(x,y, info)
	if(info === X) return
	if(info === P):
		count 증가, return은 안함.

	// 빈 공간일 경우
	for(let [dy,dx] of directions)
		// x,y,dy,dy를 이용하여 cx, cy를 구함.
		if(!visited[cy][cx])
			visited ture
			dfs(cx,cy,campus[cy][cx])



dfs(x, y, campus[y][x])


```

**Dry Run (손으로 돌려보기):** `(작성한 의사코드에 예제 입력을 넣어 변수 변화 추적)`

### **4. 최종 구현 코드**

다음과 같이 구현했으나 재귀 호출 스택을 넘어서는 문제가 발생했다.

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);
let I = [];

const campus = input.slice(1).map((el, i) => {
  const findI = el.indexOf("I");
  if (findI !== -1) {
    I = [i, findI];
  }
  return el.split("");
});
const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
]; // 상하좌우

const [x, y] = I;
const visited = Array.from({ length: N }, () => Array(M).fill(false));
visited[y][x] = true;

let count = 0;

function dfs(x, y, info) {
  if (info === "X") return;
  if (info === "P") {
    count++;
  }

  for (let [dy, dx] of directions) {
    const cx = x + dx;
    const cy = y + dy;

    if (cx >= 0 && cy >= 0 && cx < M && cy < N) {
      if (!visited[cy][cx]) {
        visited[cy][cx] = true;
        dfs(cx, cy, campus[cy][cx]);
      }
    }
  }
}
dfs(x, y, campus[y][x]);
console.log(count === 0 ? "TT" : count);
```

**반복과 스택을 이용한 구현. 요구사항, 의사코드 등은 생략하고, 바로 직접 구현을 시도한다.**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);
let startR, startC;

const campus = input.slice(1).map((el, i) => {
  const findI = el.indexOf("I");
  if (findI !== -1) {
    startR = i; // 행 (y축)
    startC = findI; // 열 (x축)
  }
  return el.split("");
});
const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const visited = Array.from({ length: N }, () => Array(M).fill(false));
let count = 0;

function solution(r, c) {
  const stk = [[r, c]];
  visited[r][c] = true;

  while (stk.length > 0) {
    const [cr, cc] = stk.pop();

    if (campus[cr][cc] === "P") {
      count++;
    }

    for (let [dr, dc] of directions) {
      const nr = cr + dr;
      const nc = cc + dc;

      // N은 행(row)의 개수, M은 열(col)의 개수.
      if (nr >= 0 && nr < N && nc >= 0 && nc < M) {
        if (!visited[nr][nc] && campus[nr][nc] !== "X") {
          visited[nr][nc] = true;
          stk.push([nr, nc]);
        }
      }
    }
  }
}
solution(startR, startC);
console.log(count === 0 ? "TT" : count);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):** 최대 맵 크기는 600 x 600 = 360,000으로 재귀 깊이 제한인 1만번 내외를 넘어섰다.

**해결 과정(Shooting):**

- **Iterative DFS 전환:** `Function Call Stack` 대신 사용자 정의 `Stack` (배열)을 사용하는 반복문 방식으로 로직을 변경하여 메모리 제한 문제를 해결.
- **성능 최적화:** 중복 방문을 방지하기 위해 `push` 직전에 방문 처리를 수행하여 스택에 불필요한 좌표가 쌓이지 않도록 관리.

**새롭게 알게 된 점:** 2차원 행렬의 좌표를 표현할 때 x, y로 표현하는 것보다 r, c가 더 가독성이 좋고 깔끔한 것 같다.
