### **1. 요구사항 분석**

**요구사항 요약: 집 N개가 수직선 위에 있고, 각 집의 좌표는 x1,…,xN이며 집이 같은 좌표를 가지지않는다. 집에 공유기 C개를 설치하려 하는데 한 집에 하나만 설치할 수 있고, 가장 인접한 공유기 사이의 거리를 가능한 크게 하여 설치할 때, 가장 인접한 두 공유기 사이의 거리의 최대값을 구하라.**

**제약 사항(Constraints): 집의 개수 N (2 ≤ N ≤ 200,000)과 공유기의 개수 C (2 ≤ C ≤ N), 집의 좌표를 나타내는 xi (0 ≤ xi ≤ 1,000,000,000)**

**예외 케이스(Edge Case):**

- 공유기와 집의 개수가 같다면, 0
- xi가 최댓값이라면, 10억으로 넘버 타입으로 표현하기에 문제 없다.
- 집의 좌표들이 뒤죽박죽이라면, 오름차순 정렬하여 처리

1, 2, 4, 8, 9

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

left = 1, right = 가장 큰 요소 - 가장 작은 요소로 초기화한다.

while문을 돌며 mid를 갱신한다.

검증 함수(isPossible): 임의의 거리 mid가 주어졌을 때, 배열을 한 번 순회하며 공유기 C개를 무사히 설치할 수 있는지 확인하고 true/false반환

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(N log X), O(1)**

### 3. 의사코드 & 검증

```jsx
left = 1, right = houses[houses.length -1] - houses[0]
result= 0

while(right >= left)
	mid = (right + left) / 2

	// countRouters 가 C와 같다면 더 큰 값으로 result 업데이트
	if(countRouters(mid,houses) > C)
	  // left = mid + 1
  else
	  // right = mid - 1


// 임의의 거리 mid를 받았을 때, 주어진 houses배열을 루프하면서
// 공유기를 설치할 수 있는지 그 개수를 반환
function countRouters(mid, houses)
	let count = 1;
	let curIndex = 0

	for(let i = 1; i < houses.length; i++)
		if(houses[i] - houses[curIndex] < mid) continue
		else
			count++;
			curIndex = i

return count
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
const [N, C] = input[0].split(" ").map(Number);
const houses = input.slice(1).map(Number);

houses.sort((a, b) => a - b);

let left = 1;
let right = houses[houses.length - 1] - houses[0];
let result = 0;

while (right >= left) {
  let mid = Math.floor((right + left) / 2);

  const countRoute = countRouters(mid);

  if (countRoute >= C) {
    result = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(result);

function countRouters(mid) {
  let count = 1;
  let curIndex = 0;

  for (let i = 1; i < houses.length; i++) {
    if (houses[i] - houses[curIndex] < mid) continue;

    count++;
    curIndex = i;
  }
  return count;
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble)**

1. **검증 로직(Decision Function)의 구멍**: `countRouters` 함수 구현 시, '가장 최근에 설치한 공유기의 위치'를 기준으로 거리를 재야 함에도, '바로 인덱스 요소'와만 거리를 비교하여 설치 가능한 공유기 수를 제대로 카운트하지 못함.

**해결 과정 (Shooting)**

1. **`curIndex` 도입**: `countRouters` 함수에서 변수 `curIndex`를 활용해 '마지막으로 공유기를 설치한 집의 인덱스'를 기억하도록 상태를 관리함. 현재 집과의 거리가 `mid` 이상일 때만 공유기를 설치하고 `curIndex`를 업데이트하도록 로직을 수정하여 $O(N)$ 검증을 완성함.

**새롭게 알게 된 점**

- **매개 변수 탐색 (Parametric Search)의 본질**: 최적화 문제(최댓값/최솟값 찾기)를 이분 탐색을 활용한 결정 문제(True/False)로 뒤집어 푸는 강력한 접근법을 체화함.

**아쉬운 점 & 리팩토링 계획**

- **아쉬운 점**: 정답을 저장할 때 방어적으로 `Math.max(result, mid)`를 사용했으나, 논리상 이분 탐색의 하한선(`left = mid + 1`)이 올라가면서 조건이 참일 때 들어오는 `mid`는 이전보다 무조건 클 수 밖에 없다는 점을 뒤늦게 깨달음.
