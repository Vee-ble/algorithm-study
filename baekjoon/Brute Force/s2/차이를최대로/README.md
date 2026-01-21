### **1. 요구사항 분석**

**요구사항 요약:**

N개의 정수 배열 A의 순서를 적절히 바꿔서 다음 식의 최대값을 구하라.

식: |A[0] - A[1]| + |A[1] - A[2]| + ... + |A[N-2] - A[N-1]|

1 4 8 10 15 20

[10, 4, 20, 1, 15, 8]

**제약 사항(Constraints): 정수 D는 -100≤D≤100**

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

입력 배열을 오름차순 정렬한 뒤 start와 end 포인터를 이용하여 입력 배열을 앞뒤로 번갈아 가며(isStart) 순회한다. lists 맨 앞, 맨 뒷 값과의 연산을 수행하고, 큰 쪽으로 현재 요소를 push 한다. 이 과정을 반복하여 식을 최댓값을 구할 수 있다.

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 구현이 간단하다.

**Trade-off 분석:**

head와 tail을 가진 doubly linked list를 이용하여 구현.

장점: 배열의 shift 연산보다 빠르게 head 요소에 접근할 수 있어 배열이 길다면 성능상 이점이 된다.

단점: 메모리를 더 많이 차지하고 직접 구현해야 하기에 비용이 더 많이 든다.

N(배열의 길이)이 3~8사이의 입력 배열 크지 않기 때문에 배열로 구현한다.

**예상 시간/공간 복잡도: O(N log N), O(N)**

### 3. 의사코드 & 검증

```jsx
1. 입력받은 배열 A를 준비한다.
2. 방문 여부를 체크할 visited 배열과 순열을 담을 temporary 배열을 생성한다.
3. DFS 함수 정의 (depth):
    a. 만약 depth가 N과 같다면 (순열 완성):
        i. 완성된 배열로 문제의 식을 계산한다. (|A[0]-A[1]| + ...)
        ii. 계산된 값과 현재 최대값(maxSum)을 비교하여 갱신한다.
        iii. 리턴한다.
    b. 0부터 N-1까지 반복 (i):
        i. 만약 visited[i]가 false라면:
            - visited[i] = true
            - temporary 배열에 A[i] 추가
            - DFS(depth + 1) 재귀 호출
            - (백트래킹) temporary 배열에서 마지막 요소 제거
            - visited[i] = false
4. DFS(0) 실행 후 maxSum 출력
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

const N = Number(input[0]);
const inputArr = input[1].split(" ").map(Number);

let maxVal = 0;
const visited = new Array(N).fill(false);
const currentPermutation = [];

function dfs(depth) {
  // [Base Case] N개의 숫자를 모두 골랐을 때
  if (depth === N) {
    let currentSum = 0;
    for (let i = 0; i < N - 1; i++) {
      currentSum += Math.abs(currentPermutation[i] - currentPermutation[i + 1]);
    }
    maxVal = Math.max(maxVal, currentSum);
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      currentPermutation.push(inputArr[i]);

      dfs(depth + 1);

      currentPermutation.pop();
      visited[i] = false;
    }
  }
}

dfs(0);
console.log(maxVal);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble) & 해결 (Shooting)**

1. **전략 수정**: 그리디(정렬 후 배치) 방식은 `[0, 1, 2, 3]` 같은 케이스에서 최적해를 보장하지 못함(반례: 6 vs 7).
   - **해결**: N의 범위(≤ 8)를 보고 완전 탐색이 가장 확실하고 안전한 방법임을 깨닫고 DFS로 구현함.

### 📚 새롭게 알게 된 점 (CS 지식)

- **순열 알고리즘**: 재귀(DFS) 외에도 `Next Permutation` 알고리즘을 사용하면 반복문만으로 다음 순열을 구할 수 있다. (C++에는 `std::next_permutation`이 있지만 JS는 직접 구현해야 함)

### 🚀 개선할 점

- 문제의 제약 조건(N)을 먼저 확인하고, $N$이 작다면 복잡한 그리디 증명보다는 **완전 탐색**을 1순위로 고려하자.
