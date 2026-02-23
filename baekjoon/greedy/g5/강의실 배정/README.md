### **1. 요구사항 분석**

**요구사항 요약: Si 부터 Ti에 끝나는 N개의 수업이 주어지는데, 최소의 강의실을 사용해 모든 수업을 가능하게 한다.**

**제약 사항(Constraints): Ti, Si가 있을 때 i가 같아도 다음 수업을 진행할 수 있다.**

1 ≤ N ≤ 200,000. 0 ≤ Si < Ti ≤ 10^9

**입출력 예시 분석:**

```jsx
N = 5
1 1
1 3
2 5
5 7
6 9
```

**예외 케이스(Edge Case):**

- N이 1인 경우 = 1

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

- 각 수업을 [시작 시간, 종료 시간] 형태로 시작시간을 기준으로 오름차순 정렬. 시작 시간이 같다면 종료시간으로 오름차순
- 전체 강의를 루프하며, 첫 번째 수업의 종료시간을 큐에 삽입한다. 큐의 top과 새 수업의 시작 시간을 비교한다.
- case 1(이어하기): 가장 빨리 끝나는 시간 ≤ 새 수업 시작 시간
  - 기존 강의실 그대로 사용, 큐에서 기존 종료 시간 빼고 새 수업의 종로시간 삽입
- case 2(방이 없음): 가장 빨리 끝나는 시간 > 새 수업 시작 시간
  - 새 강의실 생성, 큐에 새 수업의 종료시간 추가.

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: O(N log N), O(N)**

### 3. 의사코드 & 검증

```jsx
for [start, end] of lectures
	if(pq.length > 0 && pq[0] <= start)
			pq.shift()

		pq.push(end)
		pq.sort((a,b) => a - b)
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
const starts = [];
const ends = [];

for (let i = 1; i <= N; i++) {
  const [s, e] = input[i].split(" ").map(Number);
  starts.push(s);
  ends.push(e);
}

starts.sort((a, b) => a - b);
ends.sort((a, b) => a - b);

let lectureRoom = 0;
let endPointer = 0;

for (let i = 0; i < N; i++) {
  // 현재 가장 빨리 끝나는 수업보다 다음 수업 시작 시간이 빠르면?
  if (starts[i] < ends[endPointer]) {
    lectureRoom++;
  } else {
    endPointer++;
  }
}

console.log(lectureRoom);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble)**

- **시간 초과 위험:** 처음에는 의사코드에서 매번 배열을 정렬하는 `pq.sort()` 방식을 고려했으나, 이 경우 시간 복잡도가 O(N^2 log N)이기에 N=200,000인 조건에서 시간 초과(TLE)가 발생할 가능성이 컸음.

**해결 과정 (Shooting)**

- **전략 변경 (Heap → Two Pointers):** 굳이 힙을 구현하지 않더라도, 시작 시간과 종료 시간을 각각 정렬한 뒤 두 개의 포인터로 비교하면 동일한 O(N log N) 복잡도로 해결 가능하다는 점을 파악함.
- **논리 검증:** 각 수업의 '시작'은 강의실을 하나 추가하는 이벤트이고, '종료'는 강의실을 반납하는 이벤트로 간주하여 타임라인 스케줄링 방식으로 로직을 단순화함.

**새롭게 알게 된 점**

- **그리디 알고리즘의 유연성:** 특정 객체를 묶어서 관리하는 것보다, 문제의 본질(필요한 강의실의 최대 개수)에 집중하면 데이터를 분리해서 처리하는 것이 더 효율적일 수 있음을 배움.

---

**아쉬운 점 & 리팩토링 계획**
• **Heap 직접 구현:** 만약 문제 조건이 "실시간으로 강의가 추가되는 상황"이었다면 지금의 정렬 방식은 쓸 수 없음. 다음 공부 시에는 JavaScript로 **Min-Heap**을 직접 클래스로 구현하여 어떤 상황에서도 대응할 수 있도록 준비할 계획.
• **가독성:** 현재 `starts`, `ends`로 나누어 처리하는 로직을 `findMaxSimultaneousLectures()`와 같은 이름의 함수로 캡슐화하여 코드의 의도를 더 명확히 하고 싶음.
