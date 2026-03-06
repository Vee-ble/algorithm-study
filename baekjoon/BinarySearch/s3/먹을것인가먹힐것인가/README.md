### **1. 요구사항 분석**

**요구사항 요약: A,B 두 집합이 있을 때, A가 B보다 더 큰 쌍의 개수를 구하라.**

**제약 사항(Constraints): A의 수 N과 B의 수 M (1 ≤ N, M ≤ 20,000)**

**예외 케이스(Edge Case):**

- M=1이면, 정렬을 수행하지 않는다.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

B 집합을 오름차순 정렬한다.

A를 루프하며 B를 이분탐색하여, A보다 큰 쌍 중, 가장 작은 쌍을 구한다.

전체 길이 - 가장 작은 쌍의 인덱스 를 result에 더한다.

**예상 시간/공간 복잡도: O(N x log M), O(1)**

### 3. 의사코드 & 검증

```jsx
// B 집합을 오름차순 정렬

let result = 0;

for num of A집합 :
	const idx = binarySearch(num)
	if(idx === Infinity) continue
	result += B.length - idx


// 이분 탐색 수행하여 target보다 큰 수 중 가장 작은 수의 인덱스 반환
function binarySearch(target)
	let start = 0;
	let end = B.length - 1
	let idx = Infinity

	while(start <= end)
		let mid = Math.floor((start + end) / 2)

		if(B[mid] >= target)
				idx = mid;
				end = mid - 1
			else if (B[mid] < target)
				start = mid + 1

return idx
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

const T = Number(input[0]);
let cursor = 1;

for (let i = 0; i < T; i++) {
  const [N, M] = input[cursor++].split(" ");
  const A = input[cursor++].split(" ").map(Number);
  const B = input[cursor++].split(" ").map(Number);

  B.sort((a, b) => a - b);

  let result = 0;

  for (let j = 0; j < A.length; j++) {
    result += binarySearch(A[j], B);
  }
  console.log(result);
}

// 타겟보다 크거나 같은 첫 번째 원소의 위치 = 타겟보다 작은 원소의 총 개수
function binarySearch(target, Arr) {
  let start = 0;
  let end = Arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (Arr[mid] >= target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

- ‘타겟보다 크거나 같은 첫 번째 원소의 위치 = 타겟보다 작은 원소의 총 개수’로 생각하지 못하고, mid 값을 idx로 업데이트 시킴.

**해결 과정(Shooting):** start가 타겟보다 작은 원소의 총 개수임.
