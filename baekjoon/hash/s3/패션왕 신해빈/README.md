### **1. 요구사항 분석**

**요구사항 요약:**

Input

Line 1. 테스트 케이스 개수

Line 2. 의상의 수 n

Line 3. 의상의 종류 - [이름] [종류] 형태로 구분됨.

Output - 조합할 수 있는 경우의 수

**제약 사항(Constraints):**

**입출력 예시 분석:**

-

**예외 케이스(Edge Case):**

- 의상의 수 n이 0이면? 0 반환

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm)**

[이름] [종류] 형태를 map을 이용하여 key=종류, value=개수 형태로 저장한 뒤. value를 loop하고, val + 1을 해서 모든 값들끼리 곱한 뒤 -1

즉, 종류가 k개. 각 종류의 원소의 개수가 n1,n2 … nk일 때 각 종류에서 최대 1개만 선택

(n1 + 1)(n2 + 1) … (nk +1) -1

**선택한 자료구조 근거:**

- 선택: map
- 이유: 삽입/삭제 용이. size 활용 가능. values를 loop하기 위해 map.entries나 map.values 활용 가능. + 여기선 해당되지 않으나 map은 다양한 형태의 타입을 key로 활용 가능.

**Trade-off 분석:** X

**예상 시간/공간 복잡도: O(N), O(N)**

데이터 흐름 시각화:

### 3. 의사코드 & 검증

```jsx
1. const clothesMap = new Map()
2. for [cloth, kind] of items
		clothesMap.set(kind, (clothesMap.get(kind) || 0) +1)
3. for val of clothesMap.values()
		result = result * (val + 1)

4. return result -1
```

**Dry Run (손으로 돌려보기): 머리로 했음.**

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let cursor = 0;

const T = Number(input[cursor++]);

for (let i = 0; i < T; i++) {
  let result = 1;
  const n = Number(input[cursor++]);

  const clothesMap = new Map();

  for (let j = 0; j < n; j++) {
    const line = input[cursor++];

    const [name, type] = line.split(" ");

    clothesMap.set(type, (clothesMap.get(type) || 0) + 1);
  }
  for (let val of clothesMap.values()) {
    result *= val + 1;
  }
  console.log(result - 1);
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble) & 해결 (Shooting)**

1. **입력 처리**: 테스트 케이스(T) 내부에 또 다른 반복 횟수(n)가 있는 구조라 헷갈림.
   - **해결**: `cursor` 변수를 사용하여 한 줄씩 읽어 내려가는 방식으로 구현하여 복잡도를 낮춤.

**새롭게 알게 된 점 (CS 지식)**

- **Map vs Object**: 사용자 입력값(의상 종류)을 Key로 쓸 때는 `Object`보다 `Map`이 안전하다. `Object`는 `__proto__` 같은 예약어 공격(Prototype Pollution)에 취약할 수 있기 때문.
- **BigInt**: 만약 의상의 수나 종류가 매우 많아져서 결과가 2^53-1을 넘어가면 `BigInt`를 사용해야 한다. (본 문제는 범위 내라 `Number`로 충분)

**개선할 점**

- 백준에서 Node.js 입력 처리는 `cursor` 방식이 가장 직관적이고 오류가 적다. 이 패턴을 잘 기억해두자.
