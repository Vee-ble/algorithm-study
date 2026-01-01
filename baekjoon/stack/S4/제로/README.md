### **1. 요구사항 분석**

**요구사항 요약: 0이 아닌 정수가 오면 배열에 push, 0이 오면 마지막 수를 pop**

**제약 사항(Constraints):** `(시간 복잡도, 메모리, 입력 크기 등)`

**입출력 예시 분석:**

- [1]
- [1,3]
- [1,3,5]
- [1,3,5,4]
- [1,3,5] (0을 불렀기 때문에 최근의 수를 지운다)
- [1,3] (0을 불렀기 때문에 그 다음 최근의 수를 지운다)
- [1,3,7]
- [1,3] (0을 불렀기 때문에 최근의 수를 지운다)
- [1] (0을 불렀기 때문에 그 다음 최근의 수를 지운다)
- [1,6]

**예외 케이스(Edge Case):**

-

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** 스택처럼 동작하는 배열을 선언하고, **0이 아닌 정수가 오면 배열에 push, 0이 오면 마지막 수를 pop한다. push 할 때 sum 변수에 더하고, pop할 때 sum 변수에 뺀다.**

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 데이터의 마지막에서 push와 pop이 이루어짐

**Trade-off 분석:**

**예상 시간/공간 복잡도: O(N), O(N)**

### 3. 의사코드 & 검증

```jsx
1. let sum -> 최종 출력 덧셈
2. let stack = []

for c of input
	if(c === "0")이면
		sum -= stack.pop()
	else
		const num = Number(c)
		stack.push(num)
		sum += num

3. sum 반환
```

**Dry Run (손으로 돌려보기):**

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const k = input[0];
const stk = [];
let sum = 0;

for (let i = 1; i <= k; i++) {
  const c = input[i];
  if (c === "0") {
    sum -= stk.pop();
  } else {
    const num = Number(c);
    stk.push(num);
    sum += num;
  }
}
console.log(sum);
```
