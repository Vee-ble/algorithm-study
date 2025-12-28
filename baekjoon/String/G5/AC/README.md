### **1. 요구사항 분석**

**요구사항 요약:**

R(뒤집기) - 배열을 reverse하는 함수, D(버리기) - 배열의 첫 요소를 삭제하는 함수

배열이 비어있는데 D를 한 경우 에러 발생.

배열과 해당 함수를 수행햇을 때 결과를 반환하라.

**제약 사항(Constraints): X**

**입출력 예시 분석:**

```
4  // 테스트 케이스의 개수
RDD   // 수행할 함수
4  // 배열의 요소 개수
[1,2,3,4]  // 정수 배열

-> [2,1] 반환
```

**예외 케이스(Edge Case):**

- 배열의 요소의 개수가 0인데 D를 수행하는 경우우

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** 투 포인터를 이용한다. head와 tail 포인터를 두고,

**선택한 자료구조 근거:**

**Trade-off 분석:** 배열에 shift를 수행하면 비용이 많이 든다. 그렇기에 pop으로 처리해야 하는데, R의 반대로 수행한다. Sync (Boolean 초기값 false)변수를 두고,

- R이 오면 Sync가 false일 때 sync를 true, Sync가 true이면 false로 변환
- 변환된 Sync에 따라 false일 경우 reverse

이 방법은 삭제는 O(1)이지만 reverse비용이 든다.

**예상 시간/공간 복잡도: Reverse 비용 O(N), O(1)**

데이터 흐름 시각화:

```jsx
배열 = [1,2,3,4,5,6] 함수 = RDDRD

기존 방식
[1,2,3,4,5,6] -- R수행 --> [6,5,4,3,2,1]
DD수행 -> [4,3,2,1]
[4,3,2,1] -- R수행 --> [1,2,3,4]
D수행 -> [2,3,4]

나의 해결 전략
isReversed = false
h          t
[1,2,3,4,5,6]

R수행 -> isReversed True 수행.
DD 수행 -> isReversed true이면 t--
R수행 -> isReversed false 수행.
D 수행 -> isReversed가 false이면 h++

nums.slice(h, t+1)

만약 reversed가 true이면 변환된 채로 반환.
```

### 3. 의사코드 & 검증

```jsx

```

**Dry Run (손으로 돌려보기): 데이터 흐름 시각화에서 진행**

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = input[0];
let parsedCases = [];

let cursor = 1;

for (let i = 0; i < T; i++) {
  const p = input[cursor]; // 명령 함수
  const n = Number(input[cursor + 1]); // 요소의 개수
  const arrString = input[cursor + 2]; // 문자열로 된 배열

  let nums = [];
  if (n > 0) {
    // JSON.parse로 파싱
    nums = JSON.parse(arrString);
  }

  let isReversed = false;
  let isError = false;

  let head = 0;
  let tail = n - 1;

  // 명령 함수의 개수만큼 반복
  for (let j = 0; j < p.length; j++) {
    const cmd = p[j];

    if (cmd === "R") {
      isReversed = !isReversed;
    } else if (cmd === "D") {
      if (head > tail) {
        isError = true;
        break;
      }

      if (isReversed) {
        tail--;
      } else {
        head++;
      }
    }
  }

  if (isError) {
    console.log("error");
  } else {
    const result = nums.slice(head, tail + 1);

    if (isReversed) {
      result.reverse();
    }

    // 출력 포맷 정리
    console.log(JSON.stringify(result));
  }
  cursor += 3;
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):**

1. result를 그냥 출력했더니 출력 포맷이 맞지 않았음.

**해결 과정(Shooting):**

1. JSON.stringify(result)로 공백 없는 포맷으로 변경

**새롭게 알게 된 점:** 배열을 그냥 출력하면 공백을 포함한 배열을 내뱉는다.

**아쉬운 점 & 리팩토링 계획: slice와 reverse를 수행하지 않고, head부터 tail까지 순회하여 직접 문자열을 조립(string builder)한다.**

1. 배열(Array)로 구현한 Deque가 Linked List보다 성능이 빠르게 나오는 경우가 많은데, 왜 그럴까?

- **배열(Array):** 데이터가 메모리상에 **연속적으로 할당**된다. CPU가 데이터를 읽을 때 덩어리(Cache Line)째로 읽어오므로, 다음 데이터를 접근할 때 캐시 히트(Cache Hit)율이 높아 매우 빠르다.
- 연결 리스트(Linked List): 노드들이 메모리 이곳저곳에 흩어져 있고 포인터로 연결만 되어있다. 따라서 접근할 때마다 캐시미스(Cache Miss)가 발생해 메모리 접근 비용이 휠씬 크다.
- 결론: 삽입/삭제가 빈번해도, 데이터 양이 적당하다면 캐시 효율 때문에 배열이 더 빠를 수 있다.

1. Node.js는 싱글 스레드 기반인데, 대용량 데이터에 JSON.parse를 수행하면 서버 전체에 어떤 심각한 문제가 발생할 수 있으며 이에 대한 해결책은?

방법 1. Worker Threads - 메인 스레드가 아닌 별도의 스레드를 생성해 파싱 작업을 위힘.

방법 2. Streaming - 데이터를 통째로 메모리에 올리지 않고, 조금씩 읽으면서(Stream) 파싱.

들어오는 조각(Chunk) 단위로 처리하여 메모리 사용량이 획기적으로 줄고, 메인 스레드를 오래동안 점유하지 못한다.

자바스크립트는 기본적으로 싱글 스레드 이벤트 루프 모델로 실행된다. Node.js는 운영체제 위에서 실행되는 단일 프로세스이며, 기본적으로 하나의 메인 스레드에서 이벤트 루프를 돌린다. Node.js는 Worker Threads를 통해 추가적인 스레드를 생성할 수 있고, 각 스레드는 독립적인 V8 Isolate를 가지며 별도의 자바스크립트 실행 환경과 힙 메모리를 사용한다. 이 때문에 스레드 간 변수 공유는 불가능하며, 메시지 기반 통신을 통해 데이터를 주고받는다. 이 과정에서 데이터는 직렬화 → 전송 → 역직렬화 과정을 거치며, 내부적으로 Node.js와 libuv가 OS 자원을 활용해 이를 처리한다.

Node.js는 멀티 스레드 환경이지만, 자바스크립트는 스레드당 싱글 스레드 모델이다.

Promise는 메인 스레드에서 실행된다.
