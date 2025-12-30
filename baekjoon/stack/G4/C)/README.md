### **1. 요구사항 분석**

**요구사항 요약: U와 C가 주어질 때, U는 1번씩 회전하여 () 괄호를 만들 수 있고, C는 (괄호와 두번 회전하여 )를 표현할 수 있다. 올바른 괄호 문자열을 만들기 위한 최소 회전 횟수를 구하라.**

| 알파벳 | ( 로 변환 | ) 로 변환 | 특징               |
| ------ | --------- | --------- | ------------------ |
| C      | 0회       | 2회       | ( 는 비용이 안듦   |
| U      | 1회       | 1회       | 비용이 1로 동일함. |

c는 가능한 ( , u는 아무거나.

누적 균형(Balance): 왼쪽부터 읽을 때 (의 개수가 )보다 적어지면 안됨.

최종 균형: (의 수와 )의 수는 n/2로 같아야 함.

**제약 사항(Constraints): S의 길이는 짝수, c와 u로만 이루어져 있음.**

**입출력 예시 분석:**

**예외 케이스(Edge Case):**

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. 모든 문자를 닫는 괄호로 가정하고 총 비용을 구한다.

u → 1, c → 2

1. 왼쪽부터 balance를 확인해나간다. )는 -1

balance가 음수라면 c stack(c의 인덱스를 저장)을 확인하고, 있다면 c의 위치 괄호를 뒤집고 pop한다. 없다면 u stack에서 pop하여 뒤집는다. c stack에서 변환하면 총비용을 -2한다.

**선택한 자료구조 근거:**

- 선택: 그리디
- 이유: 그리디는 탐욕법이라고도 하며, 각 단계에서 지역적인 최적해를 선택해 전체적인 최적해를 찾는 방법이다.

**Trade-off 분석:**

**예상 시간/공간 복잡도: O(N), O(N)**

### 3. 의사코드 & 검증

```jsx
1.
const cStack = []
const uStack = []

s를 loop 하며 모두 ) 로 이루어진 배열과 총 비용을 구함.
U 1회, C 2회

let balance = 0;
for c of S
	if(c === ")") balance--;

	if(balance < 0) {
		cStack에 값이 있다면 balance++; 해당 index 괄호 변경
		없다면 uStack에서 나온 값을 뒤집음.
```

**Dry Run (손으로 돌려보기):**

`CCUCCUCU` → ) ) ) ) ) ) ) ) → ())))))

cStack=[0], )를 만나서 balance가 -1이 됨. → cStack을 pop하여 해당 위치의 괄호 변경

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = input[0];

let outputBuffer = "";
for (let i = 1; i <= T; i++) {
  const S = input[i];
  solution(S);
}

function solution(S) {
  const cStack = [];
  const uStack = [];
  let totalCost = 0;
  let brickets = [];

  for (let c of S) {
    if (c === "C") {
      totalCost += 2;
    } else {
      totalCost += 1;
    }
    brickets.push(")");
  }

  let balance = 0;
  for (let j = 0; j < brickets.length; j++) {
    S[j] === "C" ? cStack.push(j) : uStack.push(j);

    if (brickets[j] === ")") balance--;

    if (balance < 0) {
      let index;
      if (cStack.length > 0) {
        index = cStack.pop();
        totalCost -= 2;
      } else {
        index = uStack.pop();
      }
      brickets[index] = "(";
      balance += 2;
    }
  }
  outputBuffer += `${totalCost}\n${brickets.join("")}\n`;
}
console.log(outputBuffer);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

발생한 문제 (Trouble) & 해결 (Shooting)

1. Balance 계산 실수: 괄호를 뒤집을 때 `balance++`만 했다가 로직 오류 발생.
   - 해결: `)` (값 -1)를 `(` (값 +1)로 바꾸는 것이므로 전체 합은 +2가 되어야 함을 깨닫고 수정.
2. Greedy 확신 부족: 처음엔 어떤 걸 뒤집어야 할지 고민했으나, 비용 계산(`C`:-2, `U`:0)을 통해 `C` 우선 선택이 최적해임을 증명함.

새롭게 알게 된 점

- 가정 후 보정 전략: 처음부터 완벽하게 만들려 하기보다, 한쪽으로 몰아두고(모두 닫는 괄호) 예외 상황만 고치는(Patching) 방식이 훨씬 구현하기 쉽다는 것을 배움.
- Node.js 출력 최적화: `console.log`를 매번 찍는 것보다 하나의 문자열 버퍼(`outputBuffer`)에 담아 마지막에 출력하는 것이 입출력 비용을 줄이는 핵심 테크닉임.

개선할 점

- 변수명 오타(`brickets` -> `brackets`) 주의하자. 사소해 보이지만 코드의 신뢰도를 떨어뜨릴 수 있다.
