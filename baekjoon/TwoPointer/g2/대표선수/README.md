### **1. 요구사항 분석**

**요구사항 요약: N개의 배열, M개의 요소로 구성되어 있을 때, 각 배열에서 요소 하나를 선택해, 이 요소들 중 최댓값과 최솟값의 차가 최소가 되는 경우의 값을 구하라.**

**제약 사항(Constraints): 1 ≤ N, M ≤ 1,000 요소의 값은 0이상 10^9 이하**

**예외 케이스(Edge Case):**

- N이 1이라면 배열 내 M개 요소를 뽑아 최댓값과 최솟값의 차
- M이 1이라면 배열 간 최대, 최소값의 차

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

N개의 배열이 2중 배열 형태로 저장되어 있음.

1. N의 개수에 맞는 pointers 변수 생성(0으로 초기화)
2. while loop

   for 0부터 N까지 loop한다. (모든 배열을 한번씩 방문하여 최소, 최대값을 구하고 윈도우 이동이 필요한 배열을 찾기 위해)

   if 현재 요소 < minVal : minVal update, minIdx를 i로 업데이트

   maxVal update

3. answer = Math.min(answer, maxVal - minVal)
4. pointer[minIdx]++

**예상 시간/공간 복잡도: O(N x M log M), O(N)**

### 3. 의사코드 & 검증

```jsx
let answer = Infinity // 최솟값으로 업데이트
const pointers = Array(N).fill(0)

while(true)
	let minVal = Infinity
	let maxVal = -Infinity
	let minIdx = 0;

	for(let i of N)
		const val = array[i][pointers[i]

		if(val < minVal)
			minVal = val
			minIdx = i

		maxVal = Math.max(MaxVal, val)

		answer = Math.min(answer, maxVal - minVal)

		pointers[minIdx]++

		if(pointers[minIdx] === arrays[minIdx].length) break;
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

let classes = [];

for (let i = 0; i < N; i++) {
  const arr = input[i + 1].split(" ").map(Number);
  arr.sort((a, b) => a - b);
  classes.push(arr);
}

let answer = Infinity;
const pointers = new Array(N).fill(0);

while (true) {
  let minVal = Infinity;
  let maxVal = -Infinity;
  let minIdx = 0;

  for (let i = 0; i < N; i++) {
    const val = classes[i][pointers[i]];

    if (val < minVal) {
      minVal = val;
      minIdx = i;
    }

    maxVal = Math.max(maxVal, val);
  }

  answer = Math.min(answer, maxVal - minVal);

  pointers[minIdx]++;

  if (pointers[minIdx] === classes[minIdx].length) break;
}

console.log(answer);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

- 정렬이 되어있지 않은 테스트 케이스의 경우 오류가 발생.

**해결 과정(Shooting):**

- 모든 배열을 정렬 처리하여 해결함. 하지만 시간 초과를 유발할 가능성이 높다는 것을 확인함.

**새롭게 알게 된 점:** 위 해결책은 시간초과 가능성이 있기에 MinHeap을 이용하여 해결하는 것이 안정적이다.

**아쉬운 점 & 리팩토링 계획:** 최소 힙 직접 구현
