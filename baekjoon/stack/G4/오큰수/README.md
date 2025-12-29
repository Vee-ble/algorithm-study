### **1. 요구사항 분석**

**요구사항 요약: 크기가 N인 수열 A. 각 원소들에 대해 오큰수 NGE(i)를 구하라. 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수**

**제약 사항(Constraints):**

**입출력 예시 분석:**

- `3 5 2 7` → `5 7 7 -1`

**예외 케이스(Edge Case):**

-

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** 스택 이용. -1로 채워진 result. stack에 값이 있고, 현재 값보다 top이 작다면 pop한다. stack에 값이 있다면 result를 stack의 top으로 업데이트

**선택한 자료구조 근거:**

- 이유: 후입 선출이 필요하므로

**예상 시간/공간 복잡도: O(N), O(N**

### 3. 의사코드 & 검증

```jsx
1. const result = Array(N).fill(-1)
2. for(i of N)
	3. while(stack에 요소가 있고, cur > stack의 top)
		stack.pop()
	4. if stack에 값이 있다면
		result[i] 수정.
	stack.push(A[i])
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
const A = input[1].split(" ").map(Number);
const result = new Array(N).fill(-1);

const stack = [];
for (let i = N - 1; i >= 0; i--) {
  const current = A[i];

  while (stack.length > 0 && stack[stack.length - 1] <= current) {
    stack.pop();
  }
  if (stack.length > 0) {
    result[i] = stack[stack.length - 1];
  }
  stack.push(current);
}
console.log(result.join(" "));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):** A에 대한 처리를 잘못하여 잘못된 결과가 출력되었음.

**해결 과정(Shooting): split하고, 각 요소를 Number로 형 변환**

**새롭게 알게 된 점:** `(문법, 메서드, CS 지식 등)`

**아쉬운 점 & 리팩토링 계획:** 처음에 stack.pop 할 생각을 못했음.
