### **1. 요구사항 분석**

**요구사항 요약: 행렬을 2x2 정사각형으로 나누고, 각 정사각형에서 2번째로 큰 수만 남긴다. 이를 반복해서 크기를 1x1로 만들었을 때 마지막으로 남는 값을 반환하라.**

**제약 사항(Constraints):**

Input:

첫째 줄: (2 ≤ *N* ≤ 1024). N은 항상 2의 거듭 제곱

둘째 줄: 각 행의 원소 N개가 차례대로 주어진다. 행렬의 모든 성분은 -10,000 이상 10,000 이하의 정수

**입출력 예시 분석:**

```jsx
[[-6, -8, 7, -4],
[-5, -5, 14, 11],
[11, 11, -1, -1],
[4, 9, -2, -4]]

0 1     2 3
4 5     6 7

8 9     10 11
12 13   14 15

[
[-5, 11],
[11, -1]
]

[[11]]
```

**예외 케이스(Edge Case):**

- `(기본 예제 제외. ex: 입력이 없거나 최소값/최대값인 경우, 중복 데이터 등)`

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. 문자열 형태의 행렬을 2차원 행렬로 변환한다.
2. base case: 새로 생성한 배열 요소의 개수가 1개이면 탈출
3. 2x2 크기의 배열로 나눠서 두번째로 큰 수를 구하고, 그 큰 수들을 모아 새로운 행렬 생성.
4. 위 과정을 반복한다.

**예상 시간/공간 복잡도: O(N^2), O(N^2)**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
if(arr.length === 1) return arr[0][0]

let nextArr = []

for(let i = 0; i < N; i += 2)
		let rowArr = []
		for(let j = 0; j < N; j +=2)
				arr[i][j]
				arr[i][j+1]
				arr[i+1][j]
				arr[i+1][j+1]
				// 이 값들 중 최소 값을 구함 minVal
				rowArr.push(minVal)
			nextArr.push(rowArr)

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
let inputArr = [];

for (let i = 1; i <= N; i++) {
  inputArr.push(input[i].split(" ").map(Number));
}

function solution(arr, n) {
  if (arr.length === 1) return arr[0][0];

  let nextArr = [];

  for (let i = 0; i < n; i += 2) {
    let rowArr = [];
    for (let j = 0; j < n; j += 2) {
      const towBox = [
        arr[i][j],
        arr[i][j + 1],
        arr[i + 1][j],
        arr[i + 1][j + 1],
      ].sort((a, b) => b - a);

      rowArr.push(towBox[1]);
    }
    nextArr.push(rowArr);
  }
  return solution(nextArr, n / 2);
}
console.log(solution(inputArr, N));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

### 발생한 문제 (Trouble) & 해결 (Shooting)

1. **메모리 효율성**: 처음엔 매번 배열을 새로 생성해서 풀었으나, N이 커질 경우 메모리 부담이 됨을 인지.
   - **해결**: 배열 생성 없이 좌표(`x, y`)와 크기(`size`)만 넘기는 **순수 분할 정복** 방식으로 개선하여 공간 복잡도를 O(N^2) → O(log N)으로 줄임.

### 새롭게 알게 된 점 (CS 지식)

- **분할 정복(D&C) 패턴**: 쿼드 트리(Quad Tree)나 풀링 문제처럼 4분할 되는 문제는 `size / 2`를 재귀 인자로 넘기는 패턴이 정석이다.
- **4개 값 정렬**: 원소 개수가 매우 적을 때(4개)는 `sort` 함수보다 단순 비교 로직이 더 빠를 수 있다. (단, 구현 편의상 `sort` 사용)

### 개선할 점

- 재귀 함수 설계 시 "배열을 쪼갠다"는 생각보다는 "범위를 좁힌다"는 관점으로 접근하자.
