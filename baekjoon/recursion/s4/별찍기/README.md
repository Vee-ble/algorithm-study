### **1. 요구사항 분석**

**요구사항 요약:**

입력된 정수 N에 따라 규칙적인 별 모양 패턴을 출력해야 한다.

패턴은 중심을 기준으로 정사각형 테두리가 겹겹이 쌓이는 형태이다.

**제약 사항(Constraints): 1 ≤ N ≤ 100**

**입출력 예시 분석:**

- 공식 - 한변의 길이 L = 4N - 3
- 데이터 변환 흐름

1. 입력 문자열 “3”을 숫자 3으로 파싱
2. L= 9 계산
3. 9 x 9 크기의 2차원 배열(모두 공백으로 초기화) 생성.
4. 규칙에 따라 별 채우기.
5. 배열을 문자열로 변환해 출력.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** 2차원 배열을 만들고 바깥쪽부터 안쪽으로 하나씩 그려나감.

N을 그리고 더 작은 패턴 N-1을 그리도록 자기 자신을 호출

**선택한 자료구조 근거:**

- 선택: 2차원 배열
- 이유: 수정 가능성: js의 String은 불변이다. 즉, str[3]=”\*”과 같은 수정이 불가능하다. 배열을 이용해 특정 좌표의 값을 자유롭게 변경한다.
- 좌표 매핑: 문제의 패턴이 (x,y)좌표계에서 명확한 규칙을 갖기 때문에 그리드 형태가 적합.

**Trade-off 분석:**

재귀: 큰 문제를 작은 문제로 쪼갠다는 느낌으로 논리가 명확하므로 코드의 가독성이 좋아 보인다. 함수 호출 스택 오버헤드가 발생할 수 있는데 이 경우는 문제가 없다.

반복: 성능상 미세하게 유리하지만 안쪽으로 좌표를 갱신해나가는 로직이 재귀가 더 직관적이다.

**예상 시간/공간 복잡도:O(N^2)/O(N\*2)**

데이터 흐름 시각화:

```jsx
drawStar(3, 0, 0)
|- - -(0,0) 시작, 일이 9짜리 테두리 그리기
|----- drawStar(2,2,2)
				|- - - (2,2) 시작, 길이 5짜리 테두리 그리기
				|----- drawStar(1,4,4)
								|- - - (4,4)에 별 하나 찍기
								|----- 종료
```

### 3. 의사코드 & 검증

```jsx
L = 4 * N - 3
Map = L x L 크기의 2차원 배열

drawStar(N, x, y) // 재호출 시 (N-1, x+2, y+2)
	// base case
	if n === 1
		Map[y][x] = '*'

	curLen = 4 * n - 3

	for i from 0 to curLen - 1
		Map[y][x+i] = '*' // 윗변
		Map[y + curLen - 1][x+i] = '*' // 아랫변
		Map[y + i][x] // 왼변
		Map[y + i][x + curLen-1] = '*' // 오른변

	drawStar(n-1, x+2, y+2)

```

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

const N = parseInt(input, 10);
const L = N * 4 - 3;

const grid = Array.from({ length: L }, () => Array(L).fill(" "));

function drawStar(n, x, y) {
  if (n === 1) {
    grid[y][x] = "*";
    return;
  }

  const curLen = 4 * n - 3;

  for (let i = 0; i < curLen; i++) {
    grid[y][x + i] = "*"; // 윗변
    grid[y + curLen - 1][x + i] = "*"; // 아랫변
    grid[y + i][x] = "*"; // 왼변
    grid[y + i][x + curLen - 1] = "*"; // 오른변
  }

  drawStar(n - 1, x + 2, y + 2);
}

drawStar(N, 0, 0);
console.log(grid.map((row) => row.join("")).join("\n"));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**아쉬운 점 & 리팩토링 계획:** x와 y가 항상 같아서 drawStar(n, idx) 형태로 줄일 수 있다.
