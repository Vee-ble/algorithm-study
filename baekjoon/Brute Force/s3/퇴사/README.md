### **1. 요구사항 분석**

**요구사항 요약: 퇴사 전까지 남은 N일 동안, 상담기간(Ti)과 보상(Pi)을 고려해 서로 겹치지 않으면서 얻을 수 있는 최대 수익을 구한다.**

**제약 사항(Constraints):**

**1 ≤ N ≤ 15**

**1 ≤ Ti ≤ 5**

1 ≤Pi ≤ 1000

**입출력 예시 분석:**

N = 7일 때, 1일째 상담(T=3)을 선택하면 1,2,3일은 다른 상담 불가. 4일째부터 다시 선택 가능. 선택한 상담이 퇴사일(N+1)을 넘어가면 그 상담은 불가.

**예외 케이스(Edge Case):**

- N = 1인 경우
- 모든 상담의 Ti가 N보다 커서 아무 상담 불가.
- 마지막 날 상담의 Ti가 1이라 당일 처리 가능한 경우.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** DFS 완전 탐색.

각 날짜에서 선택지는 두가지: ‘상담을 한다’ 또는 ‘안 한다’

모든 경우의 수를 따져보며 퇴사 날짜에 도달했을 때 최대 금액을 갱신

**선택한 자료구조 근거:**

- 선택: T: 상담 기간을 담은 배열. P: 상담 보상을 담은 배열
- 이유: 인덱스 기반으로 날짜별 데이터에 즉시 접근해야 하므로 배열이 효율

**예상 시간/공간 복잡도: O(2^N), O(N)**

데이터 흐름 시각화: day 1 (Start) → Choice: OK (Jump to day 1+T1) or Choice: No (next day 2) → …. → day > N (End)

### 3. 의사코드 & 검증

```jsx
function findMax(day, total_profit)
	if(day === N + 1) // 퇴사일 도착
		// update max_profit


	// 1. 상담을 하는 경우
	if day + T[day] <= N + 1
		findMax(day + T[day], total_profit + P[day]

	// 2. 상담을 하지 않는 경우
	findMax(day + 1, total_profit)
```

**Dry Run (손으로 돌려보기): N=3, T=[3, 1, 1], P=[10, 20, 20]**

1. findMax(1, 0) 시작
2. 1일 상담 선택: day(1+3) ≤ 4, 가능. findMax(4, 10) 호출
3. findMax(4, 10), day === N + 1을 만족. max_profit과 total_profit을 비교 후 업데이트
4. 상담을 하지 않는 경우 findMax(2, 0), 1 ≤ 4 가능. findMax(3, 20) 호출
5. findMax(3, 20), day(3+1) ≤ 4, 가능. findMax(4, 40) 호출
6. findMax(4, 40), day === N + 1을 만족. max_profit과 total_profit을 비교 후 업데이트

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

const T = [];
const P = [];

input.slice(1).forEach((item) => {
  const [t, p] = item.split(" ").map(Number);
  T.push(t);
  P.push(p);
});

let max_profit = 0;

function findMax(day, total_profit) {
  if (day === N + 1) {
    max_profit = Math.max(total_profit, max_profit);
    return;
  }

  if (day + T[day - 1] <= N + 1) {
    findMax(day + T[day - 1], total_profit + P[day - 1]);
  }

  findMax(day + 1, total_profit);
}

findMax(1, 0);
console.log(max_profit);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

1. `findMax(1,0)`이 호출되고, if문에 의해 `findMax(day + T[day - 1], total_profit + P[day - 1])` 가 호출되는데, 이러한 함수들의 정보는 어디에 어떻게 관리될까?

우리가 작성한 함수가 실행될 때, 컴퓨터 내부에서는 접시를 쌓듯이 메모리에 데이터를 쌓아 올립니다. 이 공간을 **Call Stack(호출 스택)**이라고 합니다.

### 스택 프레임(Stack Frame)의 구조

함수가 하나 호출될 때마다 스택에는 **'스택 프레임'**이라는 하나의 블록이 생성됩니다. 이 블록 안에는 다음 세 가지가 들어갑니다.

1. **매개변수 (Parameters):** 함수에 전달된 값 (`day`, `total_profit`)
2. **지역 변수 (Local Variables):** 함수 내부에서 선언된 변수들
3. **복귀 주소 (Return Address):** 이 함수가 끝난 후 돌아가야 할 코드의 위치 (몇 번째 줄로 돌아갈지)

### Stack Overflow가 발생하는 과정

1. `findMax(1, 0)`이 호출되면 스택에 **프레임 1**이 쌓입니다.
2. 그 안에서 `findMax(4, 10)`을 호출하면 **프레임 2**가 그 위에 쌓입니다.
3. 만약 종료 조건(`if day == N+1`)이 없다면? 함수는 계속해서 자기를 호출하고, 스택 프레임은 천장(메모리 한계)을 뚫을 때까지 계속 쌓입니다.
4. 결국 할당된 메모리 공간을 넘어서면 프로그램이 강제 종료되는데, 이것이 **Stack Overflow**입니다.

DP로 작성한 최적화된 코드

```jsx
const fs = require("fs");
// (입력 처리 부분은 동일하여 생략)
// ... const N, T, P ...

// 1. 메모장(Cache) 초기화: -1은 '아직 계산 안 함'을 의미
// N + 2 크기로 만드는 이유는 day가 N+1까지 갈 수 있기 때문
const memo = new Array(N + 2).fill(-1);

function solve(day) {
  // [기저 사례 1] 퇴사일을 넘기면 불가능 (수익 0)
  if (day > N + 1) return -Infinity; // 불가능한 경로 처리 (매우 작은 값)

  // [기저 사례 2] 정확히 퇴사일에 도착하면 종료
  if (day === N + 1) return 0;

  // [메모이제이션] 이미 계산한 적 있는 날짜라면? 저장된 값 리턴 (중복 계산 방지)
  if (memo[day] !== -1) {
    return memo[day];
  }

  // --- 여기부터는 처음 방문한 날짜의 계산 ---

  // 1. 상담을 하는 경우 (퇴사일 안 넘길 때만)
  let profitConsult = 0;
  if (day + T[day - 1] <= N + 1) {
    // 상담 비용(P) + 상담 끝난 날짜(day + T)부터의 최대 수익
    profitConsult = P[day - 1] + solve(day + T[day - 1]);
  }

  // 2. 상담을 하지 않는 경우 (다음 날로 이동)
  let profitSkip = solve(day + 1);

  // 두 경우 중 더 큰 이득을 '메모장'에 기록하고 리턴
  memo[day] = Math.max(profitConsult, profitSkip);
  return memo[day];
}

console.log(solve(1));
```
