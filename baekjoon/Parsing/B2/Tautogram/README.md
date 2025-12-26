**1. 요구사항 분석**

- **요구사항 요약: 문장의 단어가 모두 같은 단어로 시작하면 Y를 아니면 N을 반환**
- **제약 사항(Constraints): X**
- **입출력 예시 분석:**
- **예외 케이스(Edge Case):**
  - 마지막 테스트 케이스의 다음 줄은 \*이 주어진다. 이는 판별하지 않음.

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** 문장을 split 하고, 첫 문자를 확인한 뒤 Y, N을 반환
- **예상 시간/공간 복잡도: O(N), O(N)**

### 3. 의사코드 & 검증

```jsx
1. 문장을 split 한다.
첫 문자를 저장
2. split한 문자를 for loop
	저장한 첫 문자와 loop의 첫 문자 비교하여 Y, N 반환
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

for (let i = 0; i < input.length - 1; i++) {
  const line = input[i].trim();

  if (line === "*") break;
  if (line === "") continue;

  const sentence = input[i].split(" ");
  const firstChar = sentence[0][0].toLowerCase();
  let status = true;

  for (let j = 1; j < sentence.length; j++) {
    const curChar = sentence[j][0].toLowerCase();
    if (firstChar !== curChar) {
      status = false;
      break;
    }
  }
  console.log(status ? "Y" : "N");
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

1. Y, N이 아닌 True, False를 반환하여 출력에 맞지 않는 결과를 반환했음.
2. 종료조건(’\*’)에 대한 처리를 해주지 않았다.(최종 구현에서는 구현함), 무조건 한 단어가 오기에 빈 문장에 대해 처리할 필요는 없지만 방어 코드 작성하지 않았었음.

**해결 과정(Shooting):**

1. Y, N을 출력하도록 변경
2. ‘\*’이 오면 for문을 종료하도록 처리. while 문을 써도 괜찮음.

**새롭게 알게 된 점:**

**아쉬운 점 & 리팩토링 계획:**

1. for 문이 아닌 while문으로 처리하여 “\*”이 오면 반복을 종료하도록 함.
2. split시 공백이 아닌 /\s+/ 를 사용해 연속된 공백도 깔끔하게 하나의 구분자로 처리 가능.
