### **1. 요구사항 분석**

**요구사항 요약: 물건 N개, 각 물건의 무게 W, 가치 V**

해당 물건을 챙기면 V만큼 즐길 수 있고 최대 K만큼의 무게를 넣을 수 있다.

**제약 사항(Constraints): N(1 ≤ N ≤ 100), K(1 ≤ K ≤ 100,000)**

각 물건의 무게 W(1 ≤ W ≤ 100,000)와 해당 물건의 가치 V(0 ≤ V ≤ 1,000)

모든 수는 정수

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

N개의 물건과, 배낭 용량 K를 축으로 하는 2차원 배열을 만든다.

dp[i][w]를 1번부터 i번까지의 물건을 고려했을 때, 무게 합이 w를 넘지 않는 최대 가치로 정의

1. 물건을 넣지 않은 경우: 이전의 최적해를 그대로 가져옴.

   dp[i][w] = dp[i-1][w]

2. i 물건을 넣은 경우: 현재 물건의 가치(Vi) + 남은 무게(w-Wi)를 채웠을 때의 최적해를 더함.

이 중 더 큰 값을 선택한다.

**복잡도 분석: O(N x K), O(K)**

### 3. 의사코드 & 검증

```jsx
// N: 물건 개수, K: 배낭 최대 무게
// items: [{w: 무게, v: 가치}, ...] 형태의 배열

// 1. DP 테이블 초기화 (0~K까지의 무게 담음.
const dp = new Array(K + 1).fill(0)

for(let i = 0; i< N; i++) {
	const {w, v} = items[i];

	for(let curWeight = K; curWeight >= w; curWeight--) {
		dp[curWeight] math.max(dp[curWeight], dp[curWeight - w] + v);
	}
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

const [N, K] = input[0].split(" ").map(Number);

const dp = new Array(K + 1).fill(0);

const items = [];
for (let i = 1; i <= N; i++) {
  const [w, v] = input[i].split(" ").map(Number);
  items.push({ w, v });
}

for (let i = 0; i < N; i++) {
  const { w, v } = items[i];

  for (let curWeight = K; curWeight >= w; curWeight--) {
    dp[curWeight] = Math.max(dp[curWeight], dp[curWeight - w] + v);
  }
}

console.log(dp[K]);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

- 논리 오류: 처음엔 가치가 큰 순으로 넣는 탐욕법을 생각했으나, 이 방식으로는 무게 대비 효율이 좋은 조합을 놓치게 되어 최적해를 구할 수 없음.

**해결 과정(Shooting):**

- DP 도입: 물건을 넣는 경우와 넣지 않는 경우 모두 고려하는 동적 계획법으로 선회. 1차원 배열을 사용해 메모리 사용량을 N(K)로 최적화.

**새롭게 알게 된 점:** 역순으로 순회한 이유는 전 단계($i-1$)의 최적해를 보존하여 중복 선택을 막기 위해서
