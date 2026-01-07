### **1. 요구사항 분석**

**요구사항 요약: 자연수 집합 A, B가 있을 때 A에 속하면서 B에 속하지 않는 모든 원소를 구하라.**

**제약 사항(Constraints):** `(시간 복잡도, 메모리, 입력 크기 등)`

**입출력 예시 분석:**

```
4 3 // 집합 A의 크기, B의 크기
2 5 11 7 // A의 원소
9 7 4 // B의 원소
```

**예외 케이스(Edge Case):**

- `(기본 예제 제외. ex: 입력이 없거나 최소값/최대값인 경우, 중복 데이터 등)`

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** B집합을 Loop 돌면서 Set에 저장하고, A집합을 Loop돌면서 B집합의 Set.has가 ture이면 건너뛰고, false이면 문자열에 추가.

**선택한 자료구조 근거:**

- 선택: Set
- 이유: has를 이용하여 접근은 O(1)만에 할 수 있고, key value일 형태일 필요가 없어서 Map이 아닌 Set 사용

**Trade-off 분석:**

두 문자열을 split하고 숫자 타입으로 만든 뒤 filter

같은 O(N)이지만 Set 방식이 성능 상 더 좋을 것 같음.

**예상 시간/공간 복잡도: O(N), O(N)**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
// 첫번째 방법
1. B집합 loop
	Bset.add(b element)
2. A집합 loop
	if(!Bset.has(a element)) // 가지고 있지 않으면
			문자열에 a element 추가
3. 문자열 반환

// 두번째 방법
1. 두 문자열 split(" ").map(Number)
A.filter
join(" ") 반환
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

const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);

const BSet = new Set(B);

let result = [];

for (let i = 0; i < A.length; i++) {
  const aEl = A[i];
  if (!BSet.has(aEl)) {
    result.push(aEl);
  }
}

if (result.length === 0) {
  console.log("0");
} else {
  console.log(`${result.length}\n${result.sort((a, b) => a - b).join(" ")}`);
}

// tade-off 방법
const filtered = A.filter((el) => !B.includes(el)).sort((a, b) => a - b);

if (filtered.length === 0) {
  console.log("0");
} else {
  console.log(`${filtered.length}\n${filtered.join(" ")}`);
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):** 문제에 대한 요구사항을 제대로 수행하지 않았다.

**해결 과정(Shooting):** 오름차순으로 정렬하고, 반환 요소가 없을 때 0 반환. 집합 크기 반환에 대한 처리를 했다.

**아쉬운 점 & 리팩토링 계획:** 요구사항을 제대로 파악하기.
투 포인터 가능성: 만약 메모리 제한이 매우 빡빡했다면, 정렬 후 투 포인터 방식을 사용하는 것이 대안이 될 수 있음을 배웠다.
입력 데이터를 처리할 때 input 인덱스를 하드코딩하기보다, 구조 분해 할당 등을 통해 더 명시적으로 처리하면 좋을 것 같다.
