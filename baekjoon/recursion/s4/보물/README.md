### **1. 요구사항 분석**

**요구사항 요약:**

길이가 N인 정수 배열 A, B

S = A[0] x B[0] + … + A[N-1] x B[N-1]가 있을 때 A를 재배열하여 S의 최솟값을 구하라.

**제약 사항(Constraints):**

**N ≤ 50**

0 ≤ A,B 원소 ≤ 100

**예외 케이스(Edge Case):**

- 둘의 길이가 안맞다면?
- N=0: S=0

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

- 현재 상태에서 만들 수 있는 가장 작은 곱은? → (A 최소 x B 최대)
- 이 쌍을 제거한 뒤, 남은 배열들로 다시 같은 문제를 푼다.
- Base Cases: 배열이 비었으면 0 반환

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 데이터의 순회 및 특정 인덱스의 원소 삭제가 필요.

**예상 시간/공간 복잡도: O(N^2)/O(N)**

데이터 흐름 시각화:

```jsx
[입력] A: [1,1,1,6,0], B: [2,7,8,3,1]
	↓
[재귀 1단계] A min(0), B max(8) 선택 -> 곱(0) + 다음 재귀 호출
	↓    남은 배열: A: [1,1,1,6], B: [2,7,3,1]
[재귀 2단계] A min(1), B max(7) 선택 -> 곱(7) + 다음 재귀 호출
[종료] 배열 비어있음 -> 0 반환
[출력] 총합 리턴
```

### 3. 의사코드 & 검증

```jsx
// A와 B 배열을 받아서 S의 최솟값을 반환하는 재귀 함수
function getMins(arrA, arrB)
	// Base Case: 배열이 비어있다면 0 반환
	if(arr.length === 0) return 0

	minIndexA = A 최솟값의 인덱스
	minValueA = arrA[minIndexA] // A의 최솟값

	minIndexB = B 최솟값의 인덱스
	minValueB = arrB[minIndexB] // B의 최솟값

	// 현재 재귀의 최소 곱 계산
	curValue = minValueA * minValueB

	nextA = A에서 minIndexA 제거
	nextB = B에서 minIndexB제거

	return curVal + getMins(nextA, nextB)
```

**Dry Run (손으로 돌려보기):**

A=[1,0] B=[2,8]

minA = 0, maxB=8 곱은 0, 해당 값 제거

A=[1] B=[2]

minA, minB도 동일. 곱은 2, 0 + 2. 해당 값 제거.

base case 만나서 0 return 0 + 2 + 0 으로 최종 2 반환

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

function getMinS(arrA, arrB) {
  // base case
  if (arrA.length === 0 && arrB.length === 0) return 0;

  let minIndexA = 0;
  let minValueA = Infinity;

  let maxIndexB = 0;
  let maxValueB = -Infinity;

  for (let i = 0; i < arrA.length; i++) {
    const a = arrA[i];
    const b = arrB[i];
    if (a < minValueA) {
      minIndexA = i;
      minValueA = a;
    }

    if (b > maxValueB) {
      maxIndexB = i;
      maxValueB = b;
    }
  }

  const curValue = minValueA * maxValueB;

  const nextA = arrA.filter((_, i) => i !== minIndexA);
  const nextB = arrB.filter((_, i) => i !== maxIndexB);

  return curValue + getMinS(nextA, nextB);
}

console.log(getMinS(A, B));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)
