### **1. 요구사항 분석**

**요구사항 요약:**

**적록색약(빨강과 초록을 같은 색으로 판단)인 사람이 봤을 때와 아닌 사람이 봤을 때 구역의 수를 구하라.**

**제약 사항(Constraints): 1 ≤ N ≤ 100**

**입출력 예시 분석:**

-

**예외 케이스(Edge Case):**

- 만약 재귀로 구현한다면 N이 100일 때 N x N으로 약 1만번 이상의 연산이 발생하여, 호출 스택의 연산 횟수를 넘어설 수 있기에 stack으로 구현한다.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** stack을 이용한 dfs

2중 for문으로 요소의 시작(0,0)부터 끝(N-1, N-1)까지 순회한다.

visited가 false라면

해당 좌표를 stack에 넣는다

count 증가

while(stack.length > 0)

     현재 좌표와 색상 = stack.pop()

for(let [dr, dc] of directions)

다음 좌표 nx, ny를 구함.

**선택한 자료구조 근거:**

- 선택: `Map` vs `Object`
- 이유: `(ex: 데이터의 빈번한 삽입/삭제가 필요하므로...)`

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도:**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
let normalPersonPartition = 0;
let redGreenPartition = 0;

const visited = N x N 크기의 false로 채워진 배열

for(let r = 0; r < N; r++)
		for(let c = 0; c < N; c++)
			if(!visited[r][c])
				stack.push([r,c])
				Partition 증가


			while(stack.length > 0)
				const [r, c] = stack.pop()
				const color = board[r][c]

				visited[r][c] = true

				for(let [dr, dc] of directions)
					const nr = dr + r;
					const nc = dc + c

					const nextColor = board[nr][nc]

					if(!visited[nr][nc])
						if(color === nextColor)
							stack.push([nr, nc])

						else if((color === "R" && nextColor === "G") || (color === "G" && nextColor === "R"))
							normalPersonPartition 증가 후 stack.push



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
const N = Number(input[0]);
const board = input.slice(1).map((line) => line.split(""));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function getPartitionCount(currentBoard) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let count = 0;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!visited[r][c]) {
        count++;
        let stack = [[r, c]];
        visited[r][c] = true;
        const color = currentBoard[r][c];

        while (stack.length > 0) {
          const [currR, currC] = stack.pop();

          for (let [dr, dc] of directions) {
            const nr = currR + dr;
            const nc = currC + dc;

            if (nr >= 0 && nr < N && nc >= 0 && nc < N && !visited[nr][nc]) {
              if (currentBoard[nr][nc] === color) {
                visited[nr][nc] = true;
                stack.push([nr, nc]);
              }
            }
          }
        }
      }
    }
  }
  return count;
}

// 1. 일반인 기준 계산
const normalCount = getPartitionCount(board);

// 2. 적록색약용 보드로 변경 (G를 R로 통일)
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === "G") board[i][j] = "R";
  }
}

const colorBlindCount = getPartitionCount(board);

console.log(`${normalCount} ${colorBlindCount}`);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

### 발생한 문제 (Trouble)

- **복잡한 분기 로직:** 초기 의사코드(Pseudo-code) 설계 단계에서, 하나의 DFS 함수 내에 `if`문을 사용하여 일반인과 적록색약의 경우를 동시에 처리하려 했다. 이로 인해 상태 관리(`visited` 공유 문제 등)가 복잡해지고 가독성이 떨어지는 문제로 구현에 실패.

### 해결 과정 (Shooting)

- **데이터 전처리(Pre-processing) & 함수 재사용:** 로직을 억지로 합치는 대신, **'데이터'를 변경하는 전략**을 택함.
  1. 일반인 기준으로 `getPartitionCount` 함수를 먼저 실행.
  2. 원본 배열의 `G`를 `R`로 모두 치환(Mutation).
  3. 동일한 `getPartitionCount` 함수를 재실행.
  - 이 과정을 통해 코드 중복을 획기적으로 줄이고, 비즈니스 로직을 단순하게 유지.

### 새롭게 알게 된 점 (Learning)

- **Side Effect와 불변성:** 알고리즘 풀이에서는 원본 배열 수정이 공간 효율적이지만, 실무(API 등)에서는 데이터 오염(Side Effect)을 막기 위해 `structuredClone` 등을 사용해 깊은 복사(Deep Copy)를 해야 함.
- **GC(Garbage Collection)와 메모리 Churn:** 루프 안에서 `let stack = []`를 반복적으로 선언하면, 수많은 임시 객체가 생성/삭제되어 GC에 부하(Stop-the-world)를 줄 수 있다.
- **DFS vs BFS의 메모리 특성:** 단순히 DFS가 메모리를 덜 쓴다고 생각했으나, '외길 미로' 같은 형태에서는 DFS가 모든 경로를 스택에 담아야 하므로 BFS보다 메모리를 더 많이 소비할 수 있음.

### 아쉬운 점 & 리팩토링 계획 (Refactoring)

- **객체 재사용(Object Pooling):** `stack` 배열을 `if` 블록 안에서 매번 생성하지 않고, 함수 최상단에 하나만 선언한 뒤 `stack.length = 0` 등을 이용해 **재사용**하는 방식으로 리팩토링하여 GC 오버헤드를 최적화.
