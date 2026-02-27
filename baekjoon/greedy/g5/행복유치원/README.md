### **1. 요구사항 분석**

**요구사항 요약: N개의 원소를 오름차순으로 하고, K개로 분할하려고 한다.**

분할된 배열의 비용은 첫 요소와 마지막 요소의 차가 된다. K개의 조에 대한 비용의 합이 최소가 되도록 하라.

**제약 사항(Constraints): 1 ≤ N ≤ 300,000, 1 ≤ K ≤ N**

**예외 케이스(Edge Case):**

1. K = N인 경우, N이 N개의 조로 분할되기에 비용은 0이 된다.
2. N = 1인 경우, 키 차이가 없기에 비용은 0이 된다.
3. K = 1인 경우, 분할할 필요가 없기에 (마지막 요소 - 첫 요소) 가 비용이 된다.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

각 요소간 비용을 가진 배열을 구한다. 이 배열을 내림차순으로 정렬한다.

K - 1번만큼 비용이 큰 요소(앞에서)부터 0으로 만든다.

이 배열의 총 합을 구한다.

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 인덱스로 접근할 수 있고, 순서를 가진 요소들의 집합이다.

**예상 시간/공간 복잡도: O(N log N), O(N)**

### 3. 의사코드 & 검증

```jsx
if(K === N || N === 1) return console.log(0)
if(K === 1) return console.log(list[list.length -1] - list[0]

const elDiff = new Array(N - 1)

// 요소간 비용을 가진 배열에 값 추가
for(let i = 0; i < N; i++) {
	elDiff.push(list[i + 1] - list[i])


// k - 1번 loop
	// elDiff의 앞쪽부터 0으로 만든다.


// elDiff의 총합 반환

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

const [N, K] = input[0].split(" ").map(Number);
const list = input[1].split(" ").map(Number);

function solution(list, N, K) {
  if (K === N || N === 1) return console.log(0);
  if (K === 1) return console.log(list[list.length - 1] - list[0]);

  const elDiff = new Array(N - 1);

  for (let i = 0; i < N - 1; i++) {
    elDiff[i] = list[i + 1] - list[i];
  }

  elDiff.sort((a, b) => a - b);

  let result = 0;

  for (let j = 0; j < list.length - K; j++) {
    result += elDiff[j];
  }

  return console.log(result);
}
solution(list, N, K);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점(Learned):**

**안전 정수 한계와 V8 엔진 성능 트레이드오프:** 최악의 경우에도 비용의 합이 10억 수준이므로 자바스크립트의 `Number.MAX_SAFE_INTEGER`(약 9 x 10^15) 내에서 정밀도 손실 없이 안전함을 확인힘. 더불어, 평소 프론트엔드 실무에서는 가독성을 위해 `map`, `reduce` 등의 고차 함수를 즐겨 쓰지만, N=300,000처럼 극단적인 환경에서는 **콜백 함수 호출 오버헤드와 중간 배열(Intermediate Array) 생성에 따른 가비지 컬렉션(GC) 비용** 때문에 원시적인 `for` 루프가 성능과 메모리 측면에서 압도적으로 유리하다는 점을 체득함.

**아쉬운 점 & 리팩토링 계획:**

처음 로직 설계 시 루프의 인덱스 경계값(Edge)을 선제적으로 완벽히 통제하지 못한 점이 아쉬움. 앞으로는 수도코드 단계에서부터 마지막 인덱스가 가리키는 값을 명시적으로 확인하는 습관을 들일 것.
