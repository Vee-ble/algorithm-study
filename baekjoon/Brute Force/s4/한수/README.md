### **1. 요구사항 분석**

**요구사항 요약:**

자연수 N이 주어졌을 때, 1보다 크거나 같고 N보다 작거나 같은 수 중 ‘한수’의 개수를 출력한다.

한수 정의: 어떤 양의 정수 X의 각 자리가 등차수열을 이루는 수. 예) 123(공차1), 777(공차0)

**제약 사항(Constraints): 1000보다 작거나 같은 자연수 N**

**예외 케이스(Edge Case):**

- N < 100 일경우 N 자체가 한수의 개수

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

완전 탐색: N이 최대 1,000으로 작다. 1부터 N까지 모든 수를 순회해 각 수가 한수인지 검사한다.

1~99: 무조건 한수이므로 카운트.

100~999: 3자리수이므로 백(A), 십(B), 일(C)의 자리로 분리한다. 등차수열 조건인 (B-A)===(C-B)를 만족하면 카운트

1000: 4자리 수는 무시.

**Trade-off 분석:**

수학적 접근(/, % 연산): 속도가 빠르고 메모리 사용이 적음.

단점: 코드가 직관적이지 않을 수 있음.

문자열/배열 접근

장점: 익숙하고 가독성이 좋음.

단점: 매 반복마다 객체를 생성하기에 성능 비용 발생.

**예상 시간/공간 복잡도: O(N), O(1)**

데이터 흐름 시각화:

```jsx
입력(N)
	│
	├─> [분기 1] N < 100 이면?
	│				└─> return N
	│
	└─> [분기 2] N >= 100 이면?
					├─> count = 99 (초기화)
					│
					├─> loop(i = 100 to N)
					│			├─> 자릿수 분리(100, 10, 1)
					│			│
					│			└─> IF(10의 자리 - 100의 자리 === 1의자리 - 10의 자리)? YES이면 count++
					│
					│
					├─> count 출력
```

### 3. 의사코드 & 검증

```jsx
if(N < 100) return N

let count = 99;

for(let i = 100; i <= N; i++)
		const hundreds = Math.floor(i / 100)
		const tens = Math.floor((i / 10) % 10)
		const ones = i % 10
		if(tens  - hundreds  === ones  - tens ) count++

count 출력
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
const N = Number(input);

function solution(n) {
  if (n < 100) return n;

  let count = 99;

  for (let i = 100; i <= n; i++) {
    const hundreds = Math.floor(i / 100);
    const tens = Math.floor((i / 10) % 10);
    const ones = i % 10;
    if (tens - hundreds === ones - tens) count++;
  }
  return count;
}

console.log(solution(N));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점:** 자릿수 크기가 3(백,십,일)인 작은 크기로 고정되어 있기에 while 문이 아닌 상수 값으로 해당 자릿수 값을 바로 구한다.

**아쉬운 점 & 리팩토링 계획:**
루프를 사용해 자릿수를 동적으로 배열에 담고, 그 배열을 순회하며 차이를 비교하는 방식으로 짜면 **N의 크기에 상관없는 범용적인 함수**가 된다.(일반화)
