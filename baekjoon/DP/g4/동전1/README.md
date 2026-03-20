### **1. 요구사항 분석**

**요구사항 요약: n가지 종류의 동전이 있을 때, 이 동전을 사용해서 그 가치의 합이 k원이 되도록 하는 경우의 수를 구하라.**

사용한 동전의 구성이 같은데, 순서만 다른 것은 같은 경우이다.

**제약 사항(Constraints): 1 ≤ n ≤ 100, 1 ≤ k ≤ 10,000**

**예외 케이스(Edge Case):**

- n = 1일 때, k원을 만들 수 있으면 1 만들 수 없으면 0
- k = 1, n에 1원이 있으면 1 없으면 0

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

dp[i] = 가치의 합이 i원이 되는 경우의 수

지금 내가 고려하는 동전에 대해 두 가지 선택지가 있다

1. 이 동전을 사용X: 이전에 다른 동전들로 i원을 만들었던 경우의 수를 가지고 온다. dp[i]
2. 이 동전을 적어도 하나는 쓴다: 이 동전을 하나 썼으니, 남은 금액 i - coin원을 만드는 경우의 수를 가져온다. dp[i - coin]

점화식 = dp[i] = dp[i] + dp[i-coin]

**예상 시간/공간 복잡도:**

데이터 흐름 시각화: `(입력 -> 처리 -> 출력 과정을 텍스트로 시각화)`

### 3. 의사코드 & 검증

```jsx
// 1. DP 테이블 초기화 (0원부터 k원까지 담을 수 있는 크기)
// dp[i]는 i원을 만드는 경우의 수

// 2. base case
dp[0] = 1 // 아무 동전도 선택하지 않는 경우의 수 1

// 3.동전의 종류 하나씩 고려
for coin of coins :
	// 4. 동전으로 만들 수 있는 금액 업데이트
	// coin보다 작은 금액은 만들 수 없으므로 coin부터 시작
	for i = coin; i <= k; i++ :
		dp[i] = dp[i] + dp[i - coin]

	return dp[k]
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

const [n, k] = input[0].split(" ").map(Number);

const dp = new Float64Array(k + 1);

dp[0] = 1;

for (let i = 1; i <= n; i++) {
  const coin = Number(input[i]);

  if (coin > k) continue;

  for (let j = coin; j <= k; j++) {
    dp[j] += dp[j - coin];
  }
}

console.log(dp[k]);
```

### 계속 메모리 초과가 발생하여 알아보니 js로 해결할 수 없는 문제였음.
