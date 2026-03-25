### **1. 요구사항 분석**

**요구사항 요약: 최대힙으로 구현된 우선순위 큐가 있다. 이를 이용해 시물레이션을 할 때, i번째 쿼리는 아래의 순서로 이어진다.**

- 우선순위 큐의 모든 원소에 대해 Ai를 더한다.
- 모든 원소에 대해 정수 k로 나눈 나머지를 취한다.
- top 출력한다.

**제약 사항(Constraints):**

우선순위 큐에 들어 있는 원소의 개수N, 쿼리에서 사용하는 정수K, 쿼리의 개수
T가 공백으로 구분되어 주어진다. (1 ≤ N, T ≤ 200,000; 2 ≤ K ≤ 10^9)

**예외 케이스(Edge Case):**

- 배열의 모든 원소에 더하는 값의 누적이 k배수에 맞아 떨어져서 모든 원소가 0이 되는 경우
- k가 최대값이고, 원소의 개수가 최대라면 단순 덧셈을 수행하면 넘버 타입을 넘어설 수 있지만, 하나씩 모두 더하여 구하지 않는다.
- N = 1 이라면 더하고 나눈 값만 쓰면 된다.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** 정렬(Sorting), 이분 탐색(Binary Search), 모듈러 연산(Modulo Arithmetic) 분배 법칙

**Trade-off 분석:**

**장점**: 매 쿼리마다 모든 원소에 값을 더하고 최댓값을 찾는 O(N) 작업을 O(log N)으로 획기적으로 단축

**단점:** 탐색 전 초기 배열을 정렬해야 하므로 한 번의 O(N log N) 비용이 발생하며, 배열 상태를 그대로 보존해야 하므로 다른 형태의 동적 데이터 추가/삭제에는 취약

**예상 시간/공간 복잡도:**

**시간 복잡도:** 정렬 O(N log N), T번의 쿼리마다 이분 탐색 수행에 O(T log N). 최종 시간 복잡도는 **O((N+T) log N)**

**공간 복잡도:** N개의 원소를 저장할 1차원 배열 하나만 필요하므로 **O(N)**

데이터 흐름 시각화:

1. **입력 & 전처리:** `[원본 배열]` → `각 원소 % K 적용` → `오름차순 정렬`
2. **쿼리 처리 (T번 반복):** `새로운 Ai 입력` →`totalAdd 누적 및 % K 처리`
3. **최댓값 탐색:** `정렬된 배열에서 (원소 + totalAdd) < K 인 가장 큰 원소 이분탐색(idx)으로 탐색`
4. **후보 도출:** `후보 1 (idx의 결과값)` vs `후보 2 (맨 마지막 원소의 결과값)`
5. **출력:** `Math.max(후보1, 후보2)` → `결과 배열에 push` → `한 번에 출력`

### 3. 의사코드 & 검증

```jsx
1. [초기 세팅]
   배열 arr를 오름차순으로 정렬한다.
   누적합을 관리할 변수 total_add를 0으로 초기화한다.

2. [시뮬레이션 시작]
   T번의 쿼리(Ai)에 대해 반복문을 실행한다:

       a. [상태 갱신]
          total_add = (total_add + Ai) % k 로 업데이트한다.

       b. [이분 탐색 (안 깎인 그룹 대장 찾기)]
          left = 0, right = N - 1 로 설정한다.
          안 깎인 대장의 인덱스를 저장할 변수 idx = -1 로 초기화한다.

          while (left <= right) 반복:
              mid = (left + right)의 절반

              if (arr[mid] + total_add < k) 이면:
                  // K를 넘지 않고 살아남았다면
                  idx = mid  // 일단 후보로 저장하고
                  left = mid + 1 // 더 큰 녀석이 있는지 오른쪽 절반을 탐색한다.
              else:
                  // K를 넘어버렸다면 (깎였다면)
                  right = mid - 1 // 더 작은 녀석들이 있는 왼쪽 절반을 탐색한다.

       c. [결괏값 도출 및 비교]
          후보1 (안 깎인 대장):
              만약 idx가 -1이 아니라면 -> (arr[idx] + total_add) % k
              만약 idx가 -1이라면 (모두 깎였다면) -> -1

          후보2 (깎인 그룹 대장):
              배열의 맨 마지막 원소(arr[N-1])를 사용하여 -> (arr[N-1] + total_add) % k

          현재 쿼리의 정답 = Math.max(후보1, 후보2)
          정답을 결과 리스트에 추가(혹은 출력)한다.
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
const [N, K, T] = input[0].split(" ").map(Number);

// 1. 초기 배열 전처리: K보다 큰 값이 들어올 수 있으므로 미리 K로 나눈 나머지만 저장합니다.
// 이 전처리가 있어야 아래의 정렬이 올바르게('나머지 세계' 기준으로) 수행됩니다.
const originArr = input[1].split(" ").map((x) => Number(x) % K);
const queryArr = input[2].split(" ").map(Number);

// 2. 오름차순 정렬: 이분 탐색을 사용하기 위한 필수 대전제.
originArr.sort((a, b) => a - b);

let totalAdd = 0; // 지금까지 더해진 쿼리 값들의 누적합 (오버플로우 방지를 위해 K 미만으로 유지됨)
let result = []; // 각 쿼리마다의 최댓값을 저장할 배열

// 3. 시뮬레이션 시작: T번의 쿼리를 순회합니다.
for (let i = 0; i < T; i++) {
  let curMax = -1;
  const query = queryArr[i];

  // [핵심 1] 상태 갱신: 배열 원소들을 직접 건드리는 미련한 짓을 피하고, 누적합만 안전하게 업데이트합니다.
  // (주의: 만약 query에 음수가 들어오는 문제라면 (((totalAdd + query) % K) + K) % K 로 방어해야 합니다.)
  totalAdd = (totalAdd + query) % K;

  // [핵심 2] 이분 탐색: K를 넘지 않고 살아남은(안 깎인) 그룹의 대장 찾기
  let left = 0;
  let right = N - 1;
  let idx = -1; // 안 깎인 그룹 대장의 인덱스 (전부 다 깎여서 못 찾으면 -1을 유지)

  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 자바스크립트의 실수형 나눗셈 함정 방어

    // 현재 원소의 진짜 값(원래 값 + 누적합)이 K를 넘지 않는다면 (안 깎였다면)
    if (originArr[mid] + totalAdd < K) {
      idx = mid; // 이 녀석을 일단 대장 후보로 등록하고
      left = mid + 1; // 더 큰 녀석이 있는지 오른쪽 절반을 계속 탐색하며 범위를 좁힙니다.
    } else {
      // K를 넘어버려서 깎이는 녀석이라면
      right = mid - 1; // 더 작은 녀석들이 있는 왼쪽 절반으로 도망가서 탐색합니다.
    }
  }

  // [핵심 3] 결괏값 도출 및 최종 승자 비교
  let c1 = -1;
  // 후보 1: 안 깎인 그룹의 대장을 찾았다면, 그 녀석의 진짜 결괏값을 계산합니다.
  if (idx !== -1) {
    c1 = (originArr[idx] + totalAdd) % K;
  }

  // 후보 2: 깎인 그룹의 대장.
  // 정렬된 배열의 맨 마지막 원소는 K만큼 깎이는 페널티를 받더라도, 깎인 그룹 내에서는 무조건 가장 큽니다.
  const c2 = (originArr[N - 1] + totalAdd) % K;

  // 두 대장 중 더 큰 값을 현재 쿼리의 정답으로 채택합니다.
  curMax = Math.max(c1, c2);
  result.push(curMax);
}

console.log(result.join(" "));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

1. 매 쿼리마다 배열을 조작해 O(N x T) 시간 초과 위기
2. 값을 단순 누적시 Number 타입 오버플로우 위험.
3. 초기 배열에 K보다 큰 원소가 섞여 있음.

**해결 과정(Shooting):**

1. 이분 탐색: 나머지가 깎이기 직전의 대장과 깎인 그룹의 대장 단 두명만 O(log N)으로 찾아 비교
2. totalAdd 변수 하나만 %K 처리하여 누적 업데이트
3. 초기 배열 입력 시 미리 %K 전처리 후 오름차순 정렬 적용.

**아쉬운 점 & 리팩토링 계획:** 이분 탐색 코드 GetUnclippedMaxIdx로 분리
