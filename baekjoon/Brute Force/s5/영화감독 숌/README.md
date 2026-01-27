### **1. 요구사항 분석**

**요구사항 요약: N번째로 오는 666이 연속으로 포함된 숫자를 구하라.**

**제약 사항(Constraints): N ≤ 10,000**

**입출력 예시 분석:**

- `(가상의 데이터가 입력부터 출력까지 어떻게 변환되는지 서술 또는 다이어그램으로 설명)`

**예외 케이스(Edge Case):**

- `(기본 예제 제외. ex: 입력이 없거나 최소값/최대값인 경우, 중복 데이터 등)`

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. 666부터 시작하여 1씩 더한다. 1 더한 수를 문자열로 변경하여 666이 포함되어있는지 확인. 포함되어 있다면 count 증가
2. count === N 이면 해당 수 반환

**예상 시간/공간 복잡도: O(N x 문자열 반환 비용), O(N)**

데이터 흐름 시각화:

666 + 1 = “667” → “666” 포함 X, count 증가 X

1665 + 1 = “1666” → “666” 포함 O, count 증가 O

### 3. 의사코드 & 검증

```jsx
1. let count = 1 // 666부터 시작해서 1로 시작
2. let endNum = 666

3. while(count !== N)
		endNum++;
		if(String(endNum).indexOf("666") !== -1) count++
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

function solution(N) {
  let count = 1;
  let endNum = 666;

  while (count !== N) {
    endNum++;
    if (String(endNum).indexOf("666") !== -1) count++;
  }
  return endNum;
}

console.log(solution(N));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점 (CS 지식)**

- **문자열 vs 숫자 연산**: 현재는 문자열 변환(`String(num)`)을 사용했지만, 성능이 더 중요하다면 `% 10`과 `/ 10`을 이용해 숫자 상태에서 연속된 6을 찾는 방식이 더 빠르다. (메모리 할당 비용 절감)
- **Big-O 판단력**: N이 작을 때는 복잡한 규칙 찾기보다 무식하게 세는 방법(Brute Force)이 구현도 쉽고 버그도 적은 최고의 전략이다.

  **개선할 점**

- `indexOf` 보다는 `includes`가 "포함 여부 확인"이라는 의도에 더 적합하므로 모던 자바스크립트 문법을 적극 활용하자.
