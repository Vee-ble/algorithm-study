### **1. 요구사항 분석**

**요구사항 요약: 3개의 카드를 뽑아서 M을 넘지 않고 M에 가장 근접하는 수의 합 찾기.**

**제약 사항(Constraints): 카드의 개수 N(3 ≤ N ≤ 100)과 M(10 ≤ M ≤ 300,000)**

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. 3중 for문 사용. 순회 방법:

- 첫 번째 카드: i (0부터 N-3까지)
- 두 번째 카드: j (1부터 N-2까지)
- 세 번째 카드: k (2부터 N-1까지)

1. 갱신 조건 sum = card[i] + card[j] + card[k] 일 때, sum ≤ M이고 sum ≥ max이면 max를 sum으로 갱신

**예상 시간/공간 복잡도: O(N^3), O(1)**

### 3. 의사코드 & 검증

```jsx
let max_sum = 0;

for (let i = 0; i < N - 2; i++) {
  for (let j = i + 1; j < N - 1; j++) {
    for (let k = j + 1; k < N; j++) {
      sum = card[i] + card[j] + card[k];

      if (sum <= M && max_sum < sum) max_sum = sum;

      if (max_sum === M) return max_sum;
    }
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
const [N, M] = input[0].split(" ").map(Number);
const cards = input[1].split(" ").map(Number);

function solution(N, M, cards) {
  let maxSum = 0;

  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      for (let k = j + 1; k < N; k++) {
        sum = cards[i] + cards[j] + cards[k];

        if (sum <= M && maxSum < sum) maxSum = sum;

        if (maxSum === M) return maxSum;
      }
    }
  }
  return maxSum;
}

console.log(solution(N, M, cards));
```

**질문 1. 시간 복잡도 최적화**

3개의 카드를 뽑는 로직을 O(N^2)의 시간 복잡도로 줄여서 해결하려면 알고리즘을 어떻게 변경해야 할까?

답변:
"정렬 후 `continue`"는 가지치기(Pruning)로 평균 속도를 높일 수는 있지만, 최악의 경우(모든 합이 M보다 작을 때) 여전히 O(N^3)이다.

정렬 후 투 포인터를 이용하여. for문 한개로 첫 번째 카드 `i` 를 고정한 뒤.
남은 범위(`i+1` ~ `N-1`)에서 **두 개의 포인터**(`left`, `right`)를 사용해 나머지 두 카드를 찾는다.

**질문 2. 일반화**

**'N장의 카드 중 K장을 뽑아서 합이 M을 넘지 않는 최댓값을 구하라'** (1 ≤ K ≤ N)는 문제라면 어떻게 구현하시겠습니까?

답변:

**재귀 함수 (Backtracking)**
• `for` 문을 K개 쓸 수 없으므로, 재귀 함수를 사용하여 깊이(Depth)가 K가 될 때까지 파고든다.
• `function pick(index, count, currentSum)` 형태로 구현하여 `count === K`일 때 값을 갱신
