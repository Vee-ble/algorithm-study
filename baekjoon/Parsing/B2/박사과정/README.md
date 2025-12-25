**1. 요구사항 분석**

- **요구사항 요약: “a+b” 형태의 문자열의 경우 연산 결과를, P=NP 형태의 경우 skipped를 반환**
- **제약 사항(Constraints): a,b ∈ [0,1000]이며 a와 b는 정수**

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** P=NP일 경우 skipped 출력. 아닐 경우 문자열을 +로 split한 뒤 reduce로 연산
- **Trade-off 분석:** 다른 더 나은 방법이 떠오르진 않음.
- **예상 시간/공간 복잡도: O(N), O(1)**

### 3. 의사코드 & 검증

```jsx
1. if(s = "P=N") skipped 출력
2. else s.split("+").reduce((acc,cur) => {
	덧셈 연산
}, 0)
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

for (let i = 1; i < input.length; i++) {
  const s = input[i];
  if (s === "P=NP") console.log("skipped");
  else {
    const sum = s.split("+").reduce((acc, cur) => (acc += Number(cur)), 0);
    console.log(sum);
  }
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점:** Number와 parseInt 앞뒤 공백을 자동으로 제거하고 변환하는데

parseInt("10px”) → 10 \*\*\*\*(숫자가 아닌 문자를 만나면 거기까지만 읽음)
Number("10px")→ NaN (전체가 유효한 숫자가 아니면 실패)

엄격하게 숫자여야 한다면 Number가 더 안전.

**아쉬운 점 & 리팩토링 계획:** reduce의 연산이 숫자가 아니라 배열이나 객체라면 원본 객체가 수정될 수 있기 때문에 acc를 직접 수정하지 않고, 새 객체를 생성해서 반환해야 한다. 물론 외부에서 참조하는 원복 객체가 아니라면 상관없다.
