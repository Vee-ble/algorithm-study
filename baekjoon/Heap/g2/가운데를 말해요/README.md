### **1. 요구사항 분석**

**요구사항 요약: 숫자가 하나씩 들어올 때마다, 지금까지 입력된 숫자들 중 중간값(짝수 개일 경우 중간 두 수 중 작은 값)을 실시간으로 출력해야 한다.**

**제약 사항(Constraints): 정수 1 ≤ N ≤ 100,000**

**예외 케이스(Edge Case):**

- N = 1: 첫 번째 숫자가 바로 중간 값.
- 모든 숫자가 동일하면: 중간 값도 동일
- 내림차순/오름차순 입력: 힙의 균형이 한쪽으로 쏠리지 않도록 처리 필요.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** 두 개의 힙을 이용한 중간값 추적 알고리즘

**선택한 자료구조 근거:**

- 선택: Max Heap, Min Heap
- 이유: 중간값을 기준으로 작은 값들은 Max Heap에, 큰 값들은 Min Heap에 담는다. 그러면 MaxHeap의 루트가 항상 전체의 중간 값이 된다.

**Trade-off 분석:**

**장점: 정렬을 매번 수행하는 곳보다 빠름.**

단점: 두 힙의 크기를 맞추고 루트 값을 비교해 교체하는 추가 로직 필요.

**예상 시간/공간 복잡도: O(N log N), O(N)**

### 3. 의사코드 & 검증

```jsx
MaxHeap, MinHeap 초기화

input value로 loop
	// 1. 크기 균형 맞추기
	IF MaxHeap.size() === MinHeap.size()
		// MaxHeap에 push
	ELSE // MinHeap에 push

	// 2. 값의 순서 정립(MaxHeap Top <= MinHeap Top)
	If MinHeap이 비어있지 않고, MaxHeap.top > MinHeap.top
		temp1 = MaxHeap.pop()
		temp2 = MinHeap.pop()
		MaxHeap.push(temp2)
		MinHeap.push(temp1)

	print MaxHeap top
```

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

class Heap {
  constructor(compare = (a, b) => a < b) {
    this.heap = [];
    this.compare = compare;
  }

  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  getLeftChildIdx(idx) {
    return idx * 2 + 1;
  }
  getRightChildIdx(idx) {
    return idx * 2 + 2;
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return root;
  }

  top() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parent = this.getParentIdx(index);

      if (this.compare(this.heap[index], this.heap[parent])) {
        [this.heap[index], this.heap[parent]] = [
          this.heap[parent],
          this.heap[index],
        ];
        index = parent;
      } else break;
    }
  }

  bubbleDown() {
    let index = 0;
    const size = this.heap.length;

    while (true) {
      let left = this.getLeftChildIdx(index);
      let right = this.getRightChildIdx(index);
      let target = index;

      if (left < size && this.compare(this.heap[left], this.heap[target]))
        target = left;

      if (right < size && this.compare(this.heap[right], this.heap[target]))
        target = right;

      if (target !== index) {
        [this.heap[index], this.heap[target]] = [
          this.heap[target],
          this.heap[index],
        ];
        index = target;
      } else break;
    }
  }
}

class MedianFinder {
  constructor() {
    this.maxHeap = new Heap((a, b) => a > b);
    this.minHeap = new Heap((a, b) => a < b);
  }

  add(num) {
    if (this.maxHeap.size() === this.minHeap.size()) {
      this.maxHeap.push(num);
    } else {
      this.minHeap.push(num);
    }

    if (this.minHeap.size() > 0 && this.maxHeap.top() > this.minHeap.top()) {
      const maxRoot = this.maxHeap.pop();
      const minRoot = this.minHeap.pop();

      this.maxHeap.push(minRoot);
      this.minHeap.push(maxRoot);
    }
  }

  getMedian() {
    return this.maxHeap.top();
  }
}

function solution() {
  const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

  const n = Number(input[0]);
  const mf = new MedianFinder();
  const result = [];

  for (let i = 1; i <= n; i++) {
    mf.add(Number(input[i]));
    result.push(mf.getMedian());
  }
  console.log(result.join("\n"));
}
solution();
```

AI 최적화 코드

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

class Heap {
  constructor(isMax = false) {
    this.heap = [];
    this.isMax = isMax; // 함수 대신 boolean 플래그 사용
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return root;
  }

  top() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const node = this.heap[index]; // 타겟 노드 저장

    while (index > 0) {
      const parentIdx = (index - 1) >> 1; // Math.floor 대신 비트 연산
      const parent = this.heap[parentIdx];

      // 직접 조건문으로 비교 (함수 호출 오버헤드 제거)
      if (this.isMax ? node > parent : node < parent) {
        this.heap[index] = parent; // 값을 교환(swap)하지 않고 덮어씌움
        index = parentIdx;
      } else {
        break;
      }
    }
    this.heap[index] = node; // 최종 위치에 단 한 번만 삽입
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const node = this.heap[index]; // 타겟 노드 저장

    while (true) {
      const leftIdx = (index << 1) + 1; // idx * 2 + 1
      const rightIdx = leftIdx + 1;
      let swapIdx = null;

      if (leftIdx < length) {
        const left = this.heap[leftIdx];
        if (this.isMax ? left > node : left < node) {
          swapIdx = leftIdx;
        }
      }

      if (rightIdx < length) {
        const right = this.heap[rightIdx];
        if (swapIdx === null) {
          if (this.isMax ? right > node : right < node) {
            swapIdx = rightIdx;
          }
        } else {
          const left = this.heap[leftIdx];
          if (this.isMax ? right > left : right < left) {
            swapIdx = rightIdx;
          }
        }
      }

      if (swapIdx === null) break;

      this.heap[index] = this.heap[swapIdx]; // 덮어씌우기
      index = swapIdx;
    }
    this.heap[index] = node; // 최종 위치에 삽입
  }
}

class MedianFinder {
  constructor() {
    this.maxHeap = new Heap(true); // 최대 힙
    this.minHeap = new Heap(false); // 최소 힙
  }

  add(num) {
    if (this.maxHeap.size() === this.minHeap.size()) {
      this.maxHeap.push(num);
    } else {
      this.minHeap.push(num);
    }

    if (this.minHeap.size() > 0 && this.maxHeap.top() > this.minHeap.top()) {
      const maxRoot = this.maxHeap.pop();
      const minRoot = this.minHeap.pop();

      this.maxHeap.push(minRoot);
      this.minHeap.push(maxRoot);
    }
  }

  getMedian() {
    return this.maxHeap.top();
  }
}

function solution() {
  // 정규식 분리보다 단순 문자열 분리가 더 빠릅니다
  const input = fs.readFileSync(filePath, "utf-8").trim().split("\n");

  const n = Number(input[0]);
  const mf = new MedianFinder();

  // result 배열 크기 사전 할당 (메모리 재할당 방지)
  const result = new Array(n);

  for (let i = 1; i <= n; i++) {
    mf.add(Number(input[i]));
    result[i - 1] = mf.getMedian();
  }

  console.log(result.join("\n"));
}

solution();
```

- **콜백 함수 호출 오버헤드 제거**
  - 기존 코드는 `this.compare = compare`로 콜백 함수를 받아 매 비교마다 함수를 호출합니다. `while` 문 안에서 수없이 호출되는 함수는 성능 저하의 주범입니다.
  - **개선:** `isMax`라는 불리언(Boolean) 값을 받아 내부에서 직접 연산자를 통해 비교하도록 변경했습니다.
- **배열 구조 분해 할당(Swap) 최적화**
  - `[a, b] = [b, a]` 형태의 구조 분해 할당은 가독성은 좋지만 내부적으로 임시 배열을 생성하므로 성능이 떨어집니다.
  - **개선:** 타겟이 되는 `node` 값을 미리 변수에 빼두고, 부모나 자식 노드를 한 칸씩 밀어낸 뒤 **마지막에 단 한 번만 값을 삽입**하도록 변경했습니다. (배열 쓰기 횟수가 절반으로 줄어듭니다.)
- **비트 연산자를 활용한 수학 계산**
  - `Math.floor((idx - 1) / 2)`와 `idx * 2 + 1` 은 함수 호출과 부동소수점 연산이 포함됩니다.
  - **개선:** 비트 시프트 연산(`>> 1`, `<< 1`)을 사용하여 연산 속도를 극한으로 높였습니다.
- **결과 배열(result) 메모리 사전 할당**
  - 빈 배열에 `push()`를 반복하면 배열 크기가 커질 때마다 메모리 재할당이 발생합니다.
  - **개선:** `n`이라는 크기를 미리 알고 있으므로 `new Array(n)`으로 공간을 미리 할당해두고 인덱스로 접근했습니다.

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점:** 부모/자식 인덱스를 구할 때 쓰던 Math.floor((idx - 1) / 2)와 사칙연산을 비트 시프트 연산(>> 1, << 1)로 변환 가능

**아쉬운 점 & 리팩토링 계획:** 최적화된 코드로 작성해보기.
