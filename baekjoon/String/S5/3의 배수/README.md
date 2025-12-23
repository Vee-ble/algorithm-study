**1. 요구사항 분석**

- **요구사항 요약: 큰 수가 주어졌을 때 각 자리수를 전부 더한다. 이 과정을 자릿수가 1이 될 때까지 반복하고, 자릿수가 1이 될 때 3의 배수인지 확인한다.**
- **제약 사항(Constraints):** X는 1,000,000자리 이하의 수이다. 수는 0으로 시작하지 않는다.
- **입출력 예시 분석:**
  - 1234567 -> 28 -> 10 -> 1 (NO)
- **예외 케이스(Edge Case):**
  -

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** 문자열을 한 자리씩 꺼내 더한다.
- **예상 시간/공간 복잡도: O(N) 각 자리수를 N번 돌며 연산을 수행. O(1)**

### 3. 의사코드 & 검증

```jsx
let currentStr = n
let count = 0

1. while(currentStr.length > 1)
	// currentStr로 자릿수 덧셈을 수행하는 loop
	for s of currentStr
		sum += Number(s)

	currentStr = String(sum)
	count++;
2. 결과 출력
```

- **Dry Run (손으로 돌려보기):** `(작성한 의사코드에 예제 입력을 넣어 변수 변화 추적)`

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim();

function solution(n) {
  let currentStr = n;
  let count = 0;

  while (currentStr.length > 1) {
    let sum = 0;

    for (let i = 0; currentStr.length > i; i++) {
      sum += parseInt(currentStr[i]);
    }

    currentStr = String(sum);
    count++;
  }
  console.log(count);
  if (parseInt(currentStr) % 3 === 0) {
    console.log("YES");
  } else {
    console.log("NO");
  }
}

solution(input);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

- **발생한 문제(Trouble):** 처음엔 숫자 타입으로 해결했는데 Number 타입을 넘어서는 BigInt 타입의 테스트케이스가 존재했음.
- **해결 과정(Shooting): BigInt 타입으로 처리하려 했으나 BigInt는 숫자가 커서 배열형식으로 저장되기 때문에 연산을 수행하기 적절하지 않음. 숫자를 string 처리해서 하나씩 빼서 덧셈을 수행했다.**
- **새롭게 알게 된 점:** BigInt가 배열로 저장된다는 점. 자릿수 덧셈을 문자열로 처리할 수 있다는 점.
- **아쉬운 점 & 리팩토링 계획:** 문자열 문제인데, 문자열로 처리할 생각을 하지 못했다는 점이 아쉽다. 문제를 좀 더 자세히 이해하도록 노력하자.
