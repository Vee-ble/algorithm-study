### **1. 요구사항 분석**

**요구사항 요약: 상하좌우, 대각선으로 인접한 요소의 개수를 반환한다.**

**제약 사항(Constraints): 1 ≤ M, N ≤ 250**

**예외 케이스(Edge Case):**

- M과 N이 최댓값 250일 경우 호출 스택 최대 개수인 약 1만번은 넘어거기에, 재귀로 구현하지 않고 스택을 이용하여 구현한다.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** 스택을 이용한 DFS 구현

1. 2중 for문으로 row, col을 이용하여 (0,0) 좌표부터 M,N 끝까지 loop한다.
2. 요소가 1인 경우를 찾는다.
3. 1이라면 방문 여부를 확인하고, 방문한 적이 없다면 count 증가, stack에 해당 좌표 추가. 방문 여부 true로 변경 후 다음을 수행.
   1. stack을 while loop
   2. 사방으로 방문 여부 확인 후 방문한 적이 없고, 요소가 1이면 stack.push

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: LIFO를 배열로 표현하면 연산 비용이 적게든다.

**예상 시간/공간 복잡도: O((NxM)^2), O(N x M)**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
const directions = [[1,0], [-1,0],[0,1],[0,-1],[1,1],[-1,1],[-1,-1],[1,-1]]

const stack = []

for(let r = 0; r < N; r++)
		for(let c = 0; c < M; c++)
			const p = banner[r][c]

			if(!visited[r][c] && p)
					count++;
					stack.push([r,c])

			while(stack.length > 0){
				const [r,c] = stack.pop()

				for(let [dr, dc] of directions)
						const nr = dr + r;
						const nc = dc + c;

						if(!visited[nr][nc] && banner[nr][nc]) {
							stack.push([nr, nc])
							visited[nr][nc] = true;
			}

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
const [M, N] = input[0].split(" ").map(Number);
const banner = input.slice(1).map((el) => el.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

const visited = Array.from({ length: M }, () => Array(N).fill(false));

function foundChar(banner, M, N) {
  const stack = [];
  let count = 0;

  for (let r = 0; r < M; r++) {
    for (let c = 0; c < N; c++) {
      const p = banner[r][c];

      if (!visited[r][c] && p) {
        count++;
        stack.push([r, c]);
        visited[r][c] = true;
      }

      while (stack.length > 0) {
        const [r, c] = stack.pop();

        for (let [dr, dc] of directions) {
          const nr = dr + r;
          const nc = dc + c;

          if (nr >= 0 && nr < M && nc >= 0 && nc < N) {
            if (!visited[nr][nc] && banner[nr][nc]) {
              stack.push([nr, nc]);
              visited[nr][nc] = true;
            }
          }
        }
      }
    }
  }
  return count;
}

console.log(foundChar(banner, M, N));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**아쉬운 점 & 리팩토링 계획:** **시작점 push 직후 방문 처리**를 하도록 수정

### **동적 배열**

- 동적 배열(Array, vector 등)은 내부적으로 **정적 배열**을 사용한다.
- 배열이 꽉 차면
  1. 더 큰 배열을 새로 만들고
  2. 기존 요소를 전부 복사한 뒤
  3. 새 배열에 데이터를 추가한다 → 이때 **O(N)** 발생

---

### 분할 상환 시간 복잡도 (Amortized O(1))

- 대부분의 `push`는 단순 삽입이라 **O(1)**
- **아주 가끔** 리사이징 때만 O(N)이 든다
- 이 비싼 비용을 여러 번의 `push`에 **나눠서 평균 내면**
  👉 `push`의 **분할 상환 시간 복잡도는 O(1)**

---

### 왜 배열 크기를 2배로 늘릴까?

- 1칸씩 늘리면 매번 복사 → 전체 **O(N^2)**
- **2배씩 증가**하면 리사이징 횟수가 줄어들어
  👉 전체 삽입 비용이 **O(N),** 평균은 **O(1)**
