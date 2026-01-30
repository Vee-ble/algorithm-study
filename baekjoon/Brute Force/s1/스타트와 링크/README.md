### **1. 요구사항 분석**

**요구사항 요약:**

평일 오후, 의무 참석 X, 축구를 하기 위해 모인 사람 N(짝수)

N/2로 이루어진 start팀과 link 팀으로 나눔.

N이 4일 때, 만들어 질 수 있는 팀

12 34, 13 24 , 14 23,

N이 6일 때, 만들어 질 수 있는 팀

123 346, 124 356, 125 346, 126 345,

134 256, 135 246, 136 256,

145 236, 146 235

156 234

N의 크기에 따라 반복의 횟수가 달라진다. N이 4라면 2개씩 뽑고, N이 6이라면 3개, N이 8이라면 4개씩 뽑아야 두 개의 팀을 만들 수 있다.

한마디로 조합을 구하는 문제이다. (백트래킹)

**제약 사항(Constraints): N(4 ≤ N ≤ 20, N은 짝수), 1 ≤ Sij ≤ 100**

**입출력 예시 분석:**

```
[
	[0123],
	[4056],
	[7102],
	[3450],
]

-> start = [1,2], link = [3,4]  -> 두 팀의 능력치 차이 계산
```

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** 재귀로 구현한 백트래킹 이용(dfs).

순서가 상관 없는 조합을 재귀를 이용하여 구현한다.

하나의 조합이 만들어져서 start팀에 들어가면 자동으로 link팀에도 나머지 인덱스가 들어간다.

해당 두 인덱스 배열로 2차원 배열을 돌며 sum 값을 구한다.

minSum 값이 0이 되면 종료되고, 아니라면 마지막까지 minSum을 업데이트한다.

**선택한 자료구조 근거:**

- 선택: 배열
- 이유: 인덱스 형태로 접근하기 쉽도록 입력은 2차원 배열 형태로, 가공하여 사용한다. start, link 두 배열도 인덱스로 접근할 수 있고, 순서를 가지고 있기에 배열을 사용한다.

**Trade-off 분석: N이 고정되어 있다면 for 문으로 구현하는 것이 간단할 수 있지만 N이 동적이기에 재귀를 이용하는 것이 구현이 쉽다.**

**예상 시간/공간 복잡도: O(N Log N): N/2크기 만큼 함수를 재귀 호출하기 때문에 N^2은 아닐 것 같다. / O(N): start와 link 배열이 N/2 크기를 가지기 때문.**

### 3. 의사코드 & 검증

```jsx
let start = [] // start 팀
let link = [] // link 팀
let minSum = Infinity // 합의 최솟값

capacity = [[]] // 능력치가 든 2차원 배열

function dfs(start_node, depth) //
	if(depth === N/2)  // N/2 = 2
		// minSum을 구한다.

	for(let i = start_node; i < N; i++)  // 0
		start.push(i)   // 0 1
		dfs(start_node +1, depth+1)
		start.pop()

// 12 34, 13 24 , 14  23,

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
const half = N / 2;

const capacity = input.slice(1).map((el) => el.split(" ").map(Number));

let start = [0]; // start 팀
let link = []; // link 팀
let minSum = Infinity; // 합의 최솟값

const visited = new Array(N + 1).fill(false);
visited[0] = true;

function dfs(start_Node, depth) {
  if (depth === half) {
    let startSum = 0;
    let linkSum = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // i와 j가 둘 다 true면 스타트 팀 시너지
        if (visited[i] && visited[j]) startSum += capacity[i][j];
        // i와 j가 둘 다 false면 링크 팀 시너지
        else if (!visited[i] && !visited[j]) linkSum += capacity[i][j];
      }
    }
    minSum = Math.min(minSum, Math.abs(startSum - linkSum));
    return;
  }

  for (let i = start_Node; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      start.push(i);
      dfs(i + 1, depth + 1);
      start.pop();
      visited[i] = false;
    }
  }
}
dfs(1, 1);
console.log(minSum);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble)**

- **중복 탐색 발생:** 재귀 호출 시 인덱스 관리를 `start_Node + 1`로 설정하여, 루프 내에서 이미 확인한 인덱스를 다시 탐색하는 비효율이 발생함.

**해결 과정 (Shooting)**

- **재귀 인자 최적화:** 현재 선택한 요소의 다음 인덱스부터 탐색하도록 `dfs(i + 1, depth + 1)`로 수정하여 불필요한 탐색을 제거함.

**새롭게 알게 된 점**

- **대칭성 활용 (0번 고정):** 팀 나누기 문제에서 한 명을 특정 팀에 고정하는 것만으로 전체 탐색 공간을 50% 줄일 수 있다는 점을 실전적으로 익힘.
- **복잡도의 정교함:** 일반적인 지수 시간 복잡도 O(2^N)보다 조합 공식 O(C(N, R))을 사용하는 것이 탐색 공간을 더 정교하게 예측할 수 있음을 배움.
- **Node.js 성능 특성:** 많은 양의 배열 조작(`push/pop`, `includes`)보다는 `visited` 배열과 인덱스 접근이 대규모 연산에서 더 유리함을 체감함.

**아쉬운 점 & 리팩토링 계획**

- **조기 종료 도입:** `minSum`이 0이 되는 순간 최적의 해를 찾은 것이므로, 즉시 `process.exit(0)`을 호출하여 불필요한 연산을 막는 '가지치기(Pruning)'를 추가할 계획임.
- **함수 분리:** 현재 `dfs` 내부에 점수 계산 로직이 포함되어 있어 가독성이 떨어짐. 점수 합산 로직을 별도 함수(`calculateSynergy`)로 분리하여 유지보수성을 높이고 싶음.

### 6. 최적화된 코드

```jsx
const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(/\r?\n/);

const N = Number(input[0]);
const half = N / 2;
const S = input.slice(1).map((el) => el.split(" ").map(Number));

// 1. 전처리: 각 사람의 (행 합 + 열 합)을 구함
const sums = new Array(N).fill(0);
let totalProjectedSum = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    sums[i] += S[i][j] + S[j][i];
  }
  totalProjectedSum += sums[i];
}

let minDiff = Infinity;

/**
 * @param {number} idx - 탐색 인덱스
 * @param {number} count - 스타트 팀원 수
 * @param {number} currentStat - 현재 스타트 팀의 sums 누적 합
 */
function dfs(idx, count, currentStat) {
  if (count === half) {
    // 전체 sums의 합에서 (스타트 팀의 sums 합)을 두 번 빼면
    // 그것이 바로 두 팀의 시너지 차이가 된다.
    const diff = Math.abs(totalProjectedSum / 2 - currentStat);
    minDiff = Math.min(minDiff, diff);

    if (minDiff === 0) {
      console.log(0);
      process.exit(0);
    }
    return;
  }

  if (idx === N) return;

  for (let i = idx; i < N; i++) {
    dfs(i + 1, count + 1, currentStat + sums[i]);
  }
}

// 0번은 항상 포함 (최적화)
dfs(1, 1, sums[0]);
console.log(minDiff);
```
