**1. 요구사항 분석**

- **요구사항 요약: A=(x1,y1), B=(x2,y2) A → C 거리와 B → C 거리가 주어졌을 때, O의 좌표의 수는?**
- **제약 사항(Constraints): -10,000≤x1,y1,x2,y2≤10,000, 1≤r1,r2≤10,000**
- **입출력 예시 분석:**
  - 첫 번째 줄 테스트 케이스의 개수
  - 공백으로 구분된 x1, y1, r1, x2, y2, r2
- **예외 케이스(Edge Case):**
  -

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** 두 좌표를 중점으로 거리만 큼의 반지름을 가진 원을 그렸을 때 교점의 개수가 C 좌표의 개수가 된다.

두 점 A, B 사이의 거리 d를 구한다. (x1 - x2)^2 + (y1 - y2)^2에 루트를 씌운 것과 같다.

하지만 정확한 연산을 위해 양 변에 제곱해서 계산한다.

경우의 수

A와 B의 좌표가 같고, C까지의 거리가 같을 때, d = 0, r1 = r2

C 좌표가 1개인 경우 = 교점이 1인 경우. 외접 d = r1 + r2, 내접 d = |r1 - r2|

C 좌표가 2개인 경우 = 교점이 2인 경우. |r1-r2|<d<r1+r2

- **예상 시간/공간 복잡도: O(1), O(1)**

### 3. 의사코드 & 검증

```jsx
1. distanceSquared = A와 B의 거리를 구한 값의 제곱
2. addRPow = A -> C, B -> C의 거리를 더하여 제곱(위 값에 루트를 지우기 위해 제곱하였기에 똑같이 제곱한다.)
3. subRPow = r1 - r2 제곱
	// 두 좌표가 같음
	if(dS가 0이고, r1 === r2)
		-1 반환
	// 교점이 1
	else if(dS === addRPow && dS === subRPow)
	// 교점이 0
	else if(ds > addRPow && ds < subRPow)
	else // 교점이 2 반환.

```

- **Dry Run (손으로 돌려보기):** `(작성한 의사코드에 예제 입력을 넣어 변수 변화 추적)`

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = parseInt(input[0]);

for (let i = 1; i <= T; i++) {
  const [x1, y1, r1, x2, y2, r2] = input[i].trim().split(" ").map(Number);
  solution(x1, y1, r1, x2, y2, r2);
}

function solution(x1, y1, r1, x2, y2, r2) {
  const distanceSquared = (x1 - x2) ** 2 + (y1 - y2) ** 2;
  const addRPow = (r1 + r2) ** 2;
  const subRPow = (r1 - r2) ** 2;

  if (distanceSquared === 0 && r1 === r2) {
    console.log(-1);
  } else if (distanceSquared === addRPow || distanceSquared === subRPow) {
    console.log(1);
  } else if (distanceSquared > addRPow || distanceSquared < subRPow) {
    console.log(0);
  } else {
    console.log(2);
  }
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

- **발생한 문제(Trouble):** 적절한 조건문과 공식이 떠오르지 않음.
- **해결 과정(Shooting):** 교점을 찾아야 한다는 점이 떠올랐고, 모든 조건에 맞는 올바른 식을 찾는 과정이 어려웠다.
- **새롭게 알게 된 점:**
- **아쉬운 점 & 리팩토링 계획: 조건문을 완전히 떠올리지 못했다.**
