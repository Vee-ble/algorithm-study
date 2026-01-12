### **1. 요구사항 분석**

**요구사항 요약:**

0과 1로 이루어진 N x N 크기의 정사각형 2차원 배열이 있다.

N/2 크기로 정사각형을 자르는데, 내부 요소가 모두 같다면 자르지 않고, 다르다면 같아 질 때까지 N/2크기로 잘라낸다.

요소가 모두 0인 배열, 1인 배열의 개수를 구한다.

**제약 사항(Constraints): N은 2, 4, 8, 16, 32, 64, 128 중 하나**

**입출력 예시 분석:**

Input: [[1,1],[0,1]

Output: 1, 3

**예외 케이스(Edge Case):**

-

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. N x N 크기에 0과 1로 채워진 배열로 변환한다.

function recursion(N, P)

1. const [r, c] = P
2. firstColor = arr[r*globalN + c]
3. N이 1이라면 firstColor 반환
4. N만큼 loop한다.
   1. N만큼 loop한다.
      1. index = (r x globalN) + c
      2. firseColor과 다른 값이 있다면 break;
      3. 다른 값이 없다면 firstColor 반환
5. 4개의 블럭으로 잘라내기 위해 solution 함수를 재귀적으로 호출

   1. recursion(half, [r, c]])
   2. recursion(half, [r + half, c]])
   3. recursion(half, [r, c + half]])
   4. recursion(half, [r + half, c + half]])

6. recusion

**선택한 자료구조 근거:**

- 선택: 재귀
- 이유: 구현이 간단하고, 가독성이 좋기 때문

**Trade-off 분석:** for문으로도 해결할 수 있지만 사각형을 잘라나가면서 index를 관리하기 쉽지 않다.

**예상 시간/공간 복잡도: 모르겠다. /O(1)**

### 3. 의사코드 & 검증

```jsx
// 1차원 배열과, globalN은 외부 선언.

function solution(N, P) {
  const [r, c] = P; // row, col split
  const firstColor = arr[r * globalN + c];

  // i와 j를 이용하여 0부터 N까지 for 문
  // r + i, c + j로 현재 좌표 구함
  // 현재 좌표를 이용하여 curRow * globalN + curCol로 index 구함.
  // arr[index]와 firstColor가 다르다면 break;
  // firstcolor 반환
}
```

**Dry Run (손으로 돌려보기):** `(작성한 의사코드에 예제 입력을 넣어 변수 변화 추적)`

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const globalN = Number(input[0]);
const paper = input.slice(1).flatMap((row) => row.split(" ").map(Number));

function solution() {
  const counts = [0, 0];

  function recursion(size, r, c) {
    const firstColor = paper[r * globalN + c];

    for (let i = 0; i < size; i++) {
      const rowStartIndex = (r + i) * globalN;

      for (let j = 0; j < size; j++) {
        if (paper[rowStartIndex + (c + j)] !== firstColor) {
          const half = size / 2;

          recursion(half, r, c);
          recursion(half, r, c + half);
          recursion(half, r + half, c);
          recursion(half, r + half, c + half);

          return;
        }
      }
    }

    counts[firstColor]++;
  }

  recursion(globalN, 0, 0);
  console.log(`${counts[0]}\n${counts[1]}`);
}

solution();
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점:** 1차원 배열에서 index 값을 찾기 위한 식 row \* N + col를 알게 됐다.

**아쉬운 점 & 리팩토링 계획:**

반환 값에 대한 처리를 스스로 구현하지 못했음

2차원 배열로 해결해보기
