### **1. 요구사항 분석**

**요구사항 요약: 그림의 총 개수와, 그림 중 넓이가 가장 넓은 그림의 넓이를 반환하라.**

**제약 사항(Constraints): 세로: n, 가로: m (1 ≤ n,m ≤ 500). 상하좌우 이동 가능**

그림이 하나도 없다면 넓이는 0

**입출력 예시 분석:**

**예외 케이스(Edge Case):**

- 그

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

- board를 이중 loop한다.
- 1을 만나면 큐에 넣고, 상하좌우 이동 및 방문 처리, totalPainting과 maxPainting 관리
- totalPainting은 큐에 삽입 할 때, maxPainting은 큐가 돌 때 더 큰 값으로 업데이트

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 2차원 배열이 필요하고, 큐를 쉽게 구현 가능.

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(n x m), O(n x m)**

### 3. 의사코드 & 검증

```jsx
const visited
let totalPainting
let maxPainting

for(let r = 0; r < n; r++)
		for(let c = 0; c < n; c++)
				if(visited[r][c] || board[r][c] === 0) continue

				let head = 0
				totalPainting++;
				const queue = [[r,c]]

				while(quque.length > 0)
						const [r, c] = queue[head++]

						for(let [dr, dc] fo directions)
								const nr = dr + r;
								const nc = dc + c;

								// nr, nc 가 유효한지 확인
								// In Bound, Not Visited, val = 1
								// 유효하면 큐에 삽입, MaxPainting 업데이트
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

const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i < input.length; i++) {
  board.push(input[i].split(" ").map(Number));
}

const visited = Array.from({ length: n }, () => Array(m).fill(false));
let totalPainting = 0,
  maxPainting = 0;

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function solution() {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (visited[r][c] || board[r][c] === 0) continue;

      let head = 0;
      let localCount = 0;
      totalPainting++;

      const queue = [[r, c]];
      visited[r][c] = true;
      localCount++;

      while (head < queue.length) {
        const [cr, cc] = queue[head++];

        for (let [dr, dc] of directions) {
          const nr = dr + cr;
          const nc = dc + cc;

          if (
            nr >= 0 &&
            nr < n &&
            nc >= 0 &&
            nc < m &&
            !visited[nr][nc] &&
            board[nr][nc] === 1
          ) {
            queue.push([nr, nc]);
            visited[nr][nc] = true;
            localCount++;
          }
        }
      }
      maxPainting = Math.max(maxPainting, localCount);
    }
  }
}
solution();

console.log(totalPainting + "\n" + maxPainting);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):** while 조건 식, maxPainting값 매번 업데이트(성능 저하)과 같은 부주의로 인한 문제 발생.

## 추가 공부

### 1. 비동기 (Asynchronous) :

자바스크립트의 비동기는 **"멀티 스레드(여러 명이 일함)"가 아닌** 오직 메인 스레드(한 명)가 혼자 일하되, 일하는 '순서'를 영리하게 바꾸는 동시성(Concurrency) 모델

- **동작 방식:** 서버에 데이터를 요청하거나 타이머(`setTimeout`)를 맞출 때, 메인 스레드는 그 작업을 브라우저(Web API)에게 던져놓고 즉시 다른 일을 하러 갑니다. 응답이 오면 이벤트 루프(Event Loop)가 대기열(Queue)에 콜백 함수를 넣고, 메인 스레드가 한가해질 때 그걸 꺼내서 실행합니다.
- **한계점 (CPU 집약적 작업):** 만약 3초 내내 쉼 없이 계산만 해야 하는 거대한 `while` 루프(BFS 탐색 등)를 비동기(`Promise`) 안에 넣는다면 어떨까요? 결국 그 루프를 계산하는 주체는 메인 스레드 한 명뿐입니다. 루프가 돌아가는 3초 동안 메인 스레드는 꼼짝도 못 하므로 **UI는 여전히 먹통(블로킹)**

### 2. Web Worker :

비동기의 한계(메인 스레드 독박)를 극복하기 위해 브라우저가 제공하는 **진짜 멀티 스레딩(병렬 처리)** 기술

- **동작 방식:** 메인 스레드가 브라우저에게 "이 무거운 BFS 계산 파일(`worker.js`) 좀 백그라운드에서 따로 돌려줘!"라고 명령합니다. 그러면 브라우저가 별도의 스레드(알바생)를 생성하여 작업을 맡깁니다.
- **장점:** 백그라운드에서 아무리 무거운 연산이 돌아가도, 메인 스레드는 렌더링과 사용자 클릭 이벤트를 처리하는 데 온전히 집중할 수 있습니다. UI가 전혀 멈추지 않죠.
- **특징:** 두 스레드는 메모리를 공유하지 않고, 오직 `postMessage`라는 메시지 패싱 방식을 통해서만 데이터를 주고받습니다. 프론트엔드에서 엑셀 파일 파싱이나 거대한 이미지/데이터 처리를 할 때 필수적으로 쓰입니다.

### 3. Chunking (쪼개기) :

Web Worker를 쓸 수 없거나 굳이 파일까지 분리하고 싶지 않을 때, 단일 스레드 환경에서 무거운 작업을 처리하는 프론트엔드 최적화 기법입니다.

- **동작 방식:** 10만 번을 돌아야 하는 `while` 루프가 있다면, 한 번에 10만 번을 다 돌지 않습니다.
  1. 먼저 1,000번만 돕니다.
  2. `setTimeout(..., 0)`이나 `requestAnimationFrame`을 이용해 "나머지 99,000번은 대기열(Queue) 맨 뒤로 미룰게!" 하고 메인 스레드의 제어권을 브라우저에게 양보(Yield)합니다.
  3. 브라우저가 그 짧은 틈을 타서 화면을 다시 그리고(Rendering) 사용자의 클릭 이벤트를 처리합니다.
  4. 화면 갱신이 끝나면, 다시 대기열에서 1,000번을 꺼내서 계산합니다.
- **결과:** 전체 계산이 완료되는 데 걸리는 물리적인 시간은 더 길어질 수 있지만, 사용자가 느끼기에는 **"화면이 멈추지 않고 부드럽게 작동하면서 로딩바가 올라가는"** 아주 쾌적한 경험(UX)을 제공하게 됩니다.
