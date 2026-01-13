### **1. 요구사항 분석**

**요구사항 요약: 팰린드롬이면 1, 아니면 0과 recursion 함수 호출 횟수를 반환하라.**

**제약 사항**:

- T (테스트 케이스) ≤ 1,000
- 문자열 길이 S ≤ 1,000
- 시간 제한 2초 (Node.js는 입출력 속도가 중요)

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. **재귀 구현**: 문제에서 제시한 C언어 코드를 자바스크립트 문법에 맞게 변환한다.
2. **카운팅**: 전역 변수나 클로저, 혹은 인자 전달을 통해 재귀 호출 횟수를 센다.

### 3. 의사코드 & 검증

```jsx
1. s, l(왼쪽 포인터), r(오른쪽 포인터) 을 받는 recursion 정의
	l >= r 이면 return 1
	else if(s[l] != s[r]) return 0
	else return recursion(s, l+1, r-1)

2. recursion 함수 호출

3. 결과를 출력하는 main 함수.
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

const T = Number(input[0]);

for (let i = 1; i <= T; i++) {
  const string = input[i];

  const { isPal, count } = isPalindrome(string);
  console.log(`${isPal} ${count}`);
}

function recursion(s, l, r, c) {
  if (l >= r) return { isPal: 1, count: c };
  else if (s[l] !== s[r]) return { isPal: 0, count: c };
  else return recursion(s, l + 1, r - 1, c + 1);
}

function isPalindrome(s) {
  let count = 1;
  return recursion(s, 0, s.length - 1, count);
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

### 새롭게 알게 된 점 (CS 지식)

- **스택 오버플로우(Stack Overflow)**: 재귀가 너무 깊어지면(약 1만 번 이상) 호출 스택 메모리가 초과되어 에러가 발생한다. 이때는 `while` 같은 반복문으로 변경해야 한다.
- **꼬리 재귀 최적화(TCO)**: 이론적으로는 꼬리 재귀가 스택을 재활용하여 O(1) 공간을 쓰지만, **Node.js(V8) 엔진은 이를 지원하지 않는다.** 따라서 JS에서는 깊은 재귀 사용 시 주의가 필요하다.

### 개선할 점

- 재귀 함수는 호출 비용(Overhead)이 있으므로, 성능이 중요한 코테에서는 반복문(Two Pointers)으로 구현하는 것이 더 안전하다.
