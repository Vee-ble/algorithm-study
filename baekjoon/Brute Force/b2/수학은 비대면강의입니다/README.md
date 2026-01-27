### **1. 요구사항 분석**

**요구사항 요약: 연립 방정식 ax+ by = c, dx+ey = f 가 있을 때, a,b,c,d,e,f가 주어지고, x와 y의 값을 구하라.**

**제약 사항(Constraints): -999 ≤ a,b,c,d,e,f ≤ 999**

**입출력 예시 분석:**

- a = 1, b = 3, c = -1 ⇒ x+3y = -1
- d = 4, e = 1, f = 7 ⇒ 4x+y = 7 일 때,
- x = 2, y = -1

**예외 케이스(Edge Case):**

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

ax + by = c

dx + ey = f

행렬식을 이용하여 해결한다. 두 연립 방정식을 행렬로 표현하면 AX = B가 되고,

여기서는 X를 구하면 된다. X를 구하려면 역행렬 A’(원래는 -1 표시)를 구해야 하는데

1. 우선 두 방정식의 해가 존재하는지 확인하기 위해 ae - bd 가 0이 아님을 확인.
2. A’를 구하고, x와 y를 구해군다.(자세한 식은 종이로 필기)

**예상 시간/공간 복잡도: O(1), O(1)**

### 3. 의사코드 & 검증

```jsx
1. const determinant = ae - bd

ex - determinant가 0이면 해가 없음.

2. x = ec - bf / determinant
2. y = af - dc / determinant

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
const [a, b, c, d, e, f] = input.split(" ").map(Number);

function solution(a, b, c, d, e, f) {
  const determinant = a * e - b * d;

  if (determinant === 0) return;

  const x = (e * c - b * f) / determinant;
  const y = (a * f - d * c) / determinant;

  console.log(x + " " + y);
}
solution(a, b, c, d, e, f);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**아쉬운 점 & 리팩토링 계획:** 연립 방정식의 해를 행렬로 해결하는 법을 이산수학 시간에 배웠었는데 잊어버렸다.

**새롭게 알게 된 점 (CS 지식)**

- **알고리즘 Trade-off**: 수학적 해법은 빠르지만(O(1)) 공식을 모르면 구현이 어렵고 실수하기 쉽다. 반면 브루트 포스는 느리지만(O(N^2)) 구현이 쉽고 확실하다. 제약 조건(N의 크기)에 따라 유연하게 선택해야 한다.
