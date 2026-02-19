### **1. 요구사항 분석**

**요구사항 요약: 1은 땅, 0은 바다인 섬의 개수를 세라.**

**제약 사항(Constraints): 0 ≤ w, h ≤ 50**

**예외 케이스(Edge Case):**

- w,h가 모두 0인 경우 출력이 없음.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

- 2중 배열을 loop면서 1인 경우에 큐에 삽입한다.
- queue를 while loop한다
  - 첫 요소를 빼내고, 이 요소로 상하좌우 이동 가능한 1인 좌표를 큐에 추가한다.
  - visited를 ture로 설정한다.
- queue가 종료 됐으니 카운터 증가.

**선택한 자료구조 근거:**

- 선택: 배열을 이용.
- 이유: 인덱스로 접근하기 쉽고, shift를 이용하여 간단하게 큐 구현 가능.

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(N^2), O(N^2)**

### 3. 의사코드 & 검증

```jsx
w, h

const visited = Array.from({length: h}, () => Array(w).fill(false))

row에 대한 for 문 - h
	col에 대한 for 문 - w
			만약 해당 위치에 방문한 적 있으면 continue
			const status = map[r][c]

			if status 가 1이면 큐에 추가ㅏ.

			while(queue.length > 0)
				const [r, c] = queue.shift()

				for(let [dr, dc] of positions)
					const nr = dr + r
					const nc = dc + c

					nr과 nc가 적절한지 확인.
					// w, h 범위 안에 있는가?
					// 값이 1인가?
					// visited 가 false 인가?
						적절하면 큐에 추가.


				while 종료. 카운트 증가.
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

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1], // 상하좌우
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1], // 대각선 4방향 추가
];

let line = 0;

while (line < input.length) {
  const [w, h] = input[line].split(" ").map(Number);
  const visited = Array.from({ length: h }, () => Array(w).fill(false));
  const queue = [];
  let count = 0;

  if (w === 0 && h === 0) break;

  line++;

  const map = [];
  for (let i = 0; i < h; i++) {
    map.push(input[line].split(" ").map(Number));
    line++;
  }

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (visited[r][c]) continue;

      const status = map[r][c];
      if (status === 1) {
        queue.push([r, c]);
        visited[r][c] = true;
        count++;
      }

      while (queue.length > 0) {
        const [r, c] = queue.shift();

        for (let [dr, dc] of directions) {
          const nr = dr + r;
          const nc = dc + c;

          if (nr < h && nr >= 0 && nc < w && nc >= 0 && !visited[nr][nc]) {
            if (map[nr][nc] === 1) {
              queue.push([nr, nc]);
              visited[nr][nc] = true;
            }
          }
        }
      }
    }
  }
  console.log(count);
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**아쉬운 점 & 리팩토링 계획:**

- shift() 제거 및 인덱스 포인터(head) 도입
- 코드 구조화 - solve 와 bfs 함수로 분리
