### **1. 요구사항 분석**

**요구사항 요약: 자연수가 든 배열이 있을 때, 이 배열들에 H만큼 뺀 값들의 합이 M보다 크거나 같은(≥) 합을 만드는 H 중 최댓값**

**제약 사항(Constraints): 1 ≤ N(나무의 수) ≤ 1,000,000, 1 ≤ M(필요한 나무의 길이) ≤ 2,000,000,000**

**예외 케이스(Edge Case):**

- 최솟값: 나무들이 작아서 겨우 M을 채우지 못한다면? 이에 대한 처리는 언급X
- 나무의 수가 100만, 각 나무의 높이가 10억, 필요한 나무가 20억이라면 Number범위를 초과할까?
- Number는 1조까지 표현할 수 있기에 상관 없다.
- Brute Force로 찾는다면 최악의 경우 H번 반복해야한다.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

start, mid, end를 나무의 높이로 정하고, end를 나무의 최댓값 start를 0으로 설정한다.

만약 절단된 나무의 합이 target보다 부족하다면 end를 내리고, 합이 target보다 크다면 start를 올린다.

**선택한 자료구조 근거:**

- 선택: `Map` vs `Object`
- 이유: `(ex: 데이터의 빈번한 삽입/삭제가 필요하므로...)`

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(N log(max H)),**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
1. start = 0, end = (나무 중 최댓값)
2. result = 0

3. while(start <= end) // 반복 조건: start가 end를 역전하기 전까지
		mid = Math.floor((start + end) / 2)
		sum = (모든 나무에 대해; 나무 > mid 이면 (나무 - mid)를 더함.

		if(sum < M) {
			// 나무가 부족 -> 높이를 낮춤
			end = mid - 1
		} else {
			// 나무가 충분 -> 정답 후보 저장 & 더 높게 자름
			result = mid;
			start = mid + 1
		}
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

const [N, M] = input[0].split(" ").map(Number);

const trees = input[1].split(" ").map(Number);

trees.sort((a, b) => a - b);

let start = 0,
  end = trees[trees.length - 1];

let result = 0;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let sum = trees.reduce((acc, cur) => {
    return cur > mid ? (acc += cur - mid) : acc;
  }, 0);

  if (sum < M) {
    end = mid - 1;
  } else {
    result = mid;
    start = mid + 1;
  }
}

console.log(result);
```

### **5. 트러블 슈팅 & 회고 (Retrospective)**

**발생한 문제 (Trouble):**

1. **`reduce` 오용으로 인한 `NaN` 발생:** `reduce` 콜백 함수 내 `else` 분기에서 `return`을 명시하지 않아 `undefined`가 반환되었고, 이로 인해 누적값(`acc`)이 `NaN`으로 변질됨.
2. **Call Stack Size Exceeded 위험:** N이 1,000,000일 때 `Math.max(...trees)`(전개 연산자)를 사용하면 자바스크립트 엔진의 스택 허용 범위를 초과할 가능성이 있었음.
3. **불필요한 정렬 수행:** 파라메트릭 서치 로직상 높이 값(H)을 기준으로 탐색하므로 배열 정렬이 필수 조건이 아니었으나, 관습적으로 `sort()`를 사용하여 O(N log N)의 불필요한 비용이 발생함.

**해결 과정 (Shooting):**

1. **`reduce` -> `for...of` 교체:** `reduce`의 반환값 문제를 수정하는 것을 넘어, 대용량 배열 순회 시 성능 오버헤드가 적고 가독성이 좋은 일반 `for...of` 루프로 리팩토링함.
2. **선형 탐색으로 최댓값 도출:** `Math.max(...trees)` 대신 O(N)의 단순 반복문을 통해 안전하게 최댓값(`end`)을 구하도록 변경하여 스택 오버플로우 방지.
3. **`sort` 제거**

**새롭게 알게 된 점:**

1. **파라메트릭 서치 (Parametric Search):** 이분 탐색은 단순히 값을 찾는 게 아니라, '조건(M 이상인가?)을 만족하는 최적의 값(최대 H)'을 찾는 결정 문제(Decision Problem) 해결법이라는 점.
2. **JS `reduce`의 함정:** 콜백 함수에서 모든 경로(if/else)가 반드시 값을 반환해야 누적값이 깨지지 않는다는 점.
3. **V8 엔진 한계:** 전개 연산자(`...`)는 편하지만 인자가 너무 많으면 스택이 터질 수 있어, 백만 단위 데이터에서는 사용을 자제해야 함.

**아쉬운 점 & 리팩토링 계획:**

- **심화 최적화 (Future Work):** 만약 입력 속도가 병목이 된다면 `fs.readFileSync` 후 `split` 하는 과정 대신, **Buffer를 직접 읽어 아스키 코드로 파싱**하는 방식(참고했던 '다른 사람 풀이')을 도입해 I/O 속도를 극단적으로 줄여볼 수 있음.
