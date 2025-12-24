**1. 요구사항 분석**

- **요구사항 요약: 나무들이 주어질 때 각 종이 전체에서 몇 %를 차지하는 지 구하고, 각 종의 이름은 사전순으로 출력, 비율은 백분율로 소수점 4째자리까지 반올림.**

식: (해당 종의 수 / 전체 나무 개수) \* 100

- **제약 사항(Constraints): 소수점 4째자리까지 반올림, 종 이름 ≤ 30 글자, 최대 10,000종, 최대 1,000,000 그루**
- **입출력 예시 분석:**
- **예외 케이스(Edge Case):**

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** 문자열을 Map에 저장하여, 값이 있다면 1증가 시킨다.

Map을 key를 이용하여 정렬하고, loop 돌며 해당 key와 value를 계산하여 출력한다.

- **선택한 자료구조 근거:**
  - 선택: `Map`
  - 이유:
- **Trade-off 분석:**
- **예상 시간/공간 복잡도: 모든 나무를 loop 하는 것은 O(N), Map의 key는 k개 이를 정렬하면 k log k. 자세한 시간 복잡도는 O(N + k log k), 공간 복잡도는 수에서 종으로 줄어들기에O(log n)**
- 데이터 흐름 시각화:

### 3. 의사코드 & 검증

```jsx
1. const speciesMap = new Map() // 나무의 종과 나무 개수를 저장.
2. for tree of input
		speciesMap.get(tree) ? speciesMap.set(tree, speciesMap.get(tree) +1) : speciesMap.set(tree,1)

3. [...speciesMap.keys()]
		.sort((a,b) => a.localeCompare(b))
		.forEach(tree => {
		console.log(tree + " " + calculateDistribution(input.length, speciesMap.get(tree))
		})


function calculateDistribution(totalCount, itemCount) {
	const percentage = (itemCount / totalCount) * 100
	return Math.round(percentage * 1000) / 1000
}
```

- **Dry Run (손으로 돌려보기):** `(작성한 의사코드에 예제 입력을 넣어 변수 변화 추적)`

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").split("\n");

const speciesMap = new Map();
let totalCount = 0;

for (const tree of input) {
  if (tree === "") continue; // 마지막 개행만 방어
  speciesMap.set(tree, (speciesMap.get(tree) || 0) + 1);
  totalCount++;
}

const results = [];
[...speciesMap.keys()].sort().forEach((tree) => {
  const percentage = ((speciesMap.get(tree) / totalCount) * 100).toFixed(4);
  results.push(`${tree} ${percentage}`);
});

console.log(results.join("\n"));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

- **발생한 문제(Trouble):** sort에서 localeCompare를 사용해서 틀렸다고 함.
- **해결 과정(Shooting): 기본으로 변경**
- **새롭게 알게 된 점:** localeComapre은 사람의 사전, sort는 컴퓨터의 사전
- **아쉬운 점 & 리팩토링 계획:**
