### **1. 요구사항 분석**

**요구사항 요약:**

- 두 배열 A,B의 모든 가능한 부 배열의 합을 각각 구한다.
- A의 부 배열 합, B의 부 배열 합을 더해 T가 되는 모든 쌍의 개수를 구한다.

**제약 사항(Constraints):** `(시간 복잡도, 메모리, 입력 크기 등)`

**입출력 예시 분석:**

A = [1,3,1,2] B = [1,3,2], T = 5

```
T(=5) = A[1] + B[1] + B[2]
      = A[1] + A[2] + B[1]
      = A[2] + B[3]
      = A[2] + A[3] + B[1]
      = A[3] + B[1] + B[2]
      = A[3] + A[4] + B[3]
      = A[4] + B[2]
```

**예외 케이스(Edge Case):**

- 답이 0인 경우: A와 B를 어떻게 조합해도 T를 만들 수 없을 때.
- 음수 데이터: 음수가 섞일 경우에 대한 대비와 주의가 필요
- 매우 큰 정답: 가능한 경우의 수가 32비트 정수 범위를 초과하는 경우

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. 전처리: 배열 A와 B 각각에 대해, 만들 수 있는 모든 부 배열의 합을 따로 계산하여 새로운 배열에 저장한다.

- A = [1,3,1,2] → SumA = [1,4,5,7,3,4,6,1,3,2]
- 두 리스트 SumA, SumB에서 원소 하나씩 골라 더했을 때 T가 되는 쌍 개수 구하기로 변환.

1. 쌍 찾기

1. 정렬 + 투 포인터

- 자료구조: Array
- 로직:
  1. SumA, SumB 모두 오름차순 정렬
  2. 두 포인터(PA는 시작, PB는 끝)
  3. 합이 T보다 작으면 PA 증가, 크면 PB 감소)

1. 해시 맵

- 자료구조 map
- 로직:
  1. SumB의 모든 합을 구하면서, {합 : 개수} 형태로 Map에 저장
  2. SumA를 순회하면서 필요한 값(T-A의 합)이 Map에 몇 개 있는지 확인해 정답에 더함.

**Trade-off 분석:** 1번은 메모리 사용량은 일정하나 정렬 비용이 든다. 2번은 코드가 직관적이고, 검색 속도나 빠르나 Map의 오버헤드가 클 수 있다.

**예상 시간/공간 복잡도: O(N^2)**

데이터 흐름 시각화:

1. 입력 A, B, T
2. 처리 1: A의 부 배열 합 계산 → ListA
3. 처리 2: B의 부 배열 합 계산 → 빈도수 맵 MapB {합: 등장횟수}
4. 처리 3: ListA를 돌며 (T-값)이 MapB에 있는지 확인 후 카운트 누적
5. 출력 최종 카운트

### 3. 의사코드 & 검증

```jsx
1. 변수 초기화
let answer = 0; // 결과 값
const mapB = new Map(); {부 배열의 합: 해당 합이 나온 횟수)

2. 배열 B의 부 배열 합 구하기
for i = 0; B의 길이 -1까지:
	sum = 0;
	for j = i; B의 길이 -1까지:
		sum = sum + B[j]
		mapB에 sum이 있다면: mapB[sum] += 1
		없다면: mapB[sum] = 1

3. 배열 A의 모든 부 배열 합 구하면서 정답 찾기
for i = 0; A의 길이 -1까지:
	sum = 0;
	for j = i; A의 길이 -1까지:
		sum = sum + A[j]

		target = T - sum

		mapB에 target 이 있다면: answer += mpaB의 값


결과 반환
```

**Dry Run (손으로 돌려보기):**

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = Number(input[0]);
const A = input[2].split(" ").map(Number);
const B = input[4].split(" ").map(Number);

let answer = 0;
const mapB = new Map();

for (let i = 0; i < B.length; i++) {
  let sum = 0;
  for (let j = i; j < B.length; j++) {
    sum += B[j];
    mapB.set(sum, (mapB.get(sum) || 0) + 1);
  }
}

for (let i = 0; i < A.length; i++) {
  let sum = 0;
  for (let j = i; j < A.length; j++) {
    sum += A[j];

    const target = T - sum;

    if (mapB.has(target)) {
      answer += mapB.get(target);
    }
  }
}

console.log(answer);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점**

- **입력 파싱**: 백준에서 배열 입력이 여러 줄에 걸쳐 나올 수 있으므로, 고정 인덱스(`input[2]`) 접근보다 `cursor`를 이용한 순차 파싱이 훨씬 안전하다.
- **Trade-off**: 메모리가 부족한 환경이라면 `Two Pointers`가 유리하겠지만, 일반적인 코딩 테스트에서는 구현 속도가 빠른 `Map`이 유리하다.
- **Overflow 체크**: 정답의 최대값이 10^12(1조) 정도이므로 자바스크립트의 `Number`(9000조) 범위 내에서 안전하게 처리 가능하다.

**🚀 개선할 점**

- 부 배열 합을 구할 때 `reduce` 등을 쓰지 않고 이중 `for`문 내에서 `sum +=`을 누적하는 방식(`O(1)`)을 사용하여 효율적으로 잘 구현했다. 이 패턴을 유지하자.
