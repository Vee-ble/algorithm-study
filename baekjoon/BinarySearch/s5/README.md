### **1. 요구사항 분석**

**요구사항 요약: 정수인 숫자카드 N과 M이 있을 때, M의 숫자 중 N에 포함 여부(1: 포함, 0: 미포함)를 반환하라.**

**제약 사항(Constraints): 1 ≤ N,M ≤ 500,000, 숫자의 범위 -10,000,000 ≤ 숫자 ≤ 10,000,000**

**예외 케이스(Edge Case):**

- N, M이 500,000일 경우 N X M번 수행하면 2500억번으로 연산이 많기에 더 나은 방법을 고민한다.
- 숫자가 극한의 값일 경우, 특정 연산을 수행할 일은 없기에 넘버 타입의 범위(1조)를 넘지는 않는다.
- N이 1일 경우 M에 포함 여부를 찾아서 바로 반환한다.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

N을 오름차순으로 정렬한다. 정렬을 수행하는 이유는 이분 탐색으로 문제를 해결하기 위함이다.
정렬을 수행한 뒤, M을 루프하며 한 숫자씩 N을 이분 탐색하며 포함 여부를 확인합니다.

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 포함 여부를 배열에 담는다. 순서를 가진 값이고, 출력을 위해 문자열 형태로 한번에 반환하기 쉽도록 내장 함수들을 이용할 수 있다.

**예상 시간/공간 복잡도: O((N + M) log N), O(M)**

### 3. 의사코드 & 검증

```jsx
const results = []
NArr을 정렬. ASC

for(num of MArr)
	results.push(binarySearch(NArr, num))

// 이분 탐색 수행 메서드, 포함여부를 반환.
function binarySearch(NArr, target)
	let start = 0;
	let end = NArr.length - 1

	while(start <= end)
		let mid = Math.floor((end + start) / 2)

		if(NArr[mid] === target)
				return 1 // 값을 찾았다면 1반환
			else if (arr[mid] < target)
				left = mid + 1
			else right = mid - 1

	return 0


results.join(" ") 한 결과 출력
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

let cursor = 0;
const N = Number(input[cursor++]);
const NArr = input[cursor++].split(" ").map(Number);
const M = Number(input[cursor++]);
const MArr = input[cursor++].split(" ").map(Number);

function solution(NArr, MArr) {
  const results = [];

  NArr.sort((a, b) => a - b);

  for (const num of MArr) {
    results.push(binarySearch(NArr, num));
  }

  console.log(results.join(" "));
}

function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      return 1;
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return 0;
}

solution(NArr, MArr);
```
