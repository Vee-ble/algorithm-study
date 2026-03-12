### **1. 요구사항 분석**

**요구사항 요약: a,b로만 이루어진 문자열이 주어질 때, a를 모두 연속으로 만들기 위해 필요한 교환의 회수를 최소로 하는 코드 작성. 이 문자열은 원형이라 처음과 끝은 인접하다.**

**제약 사항(Constraints): 문자열의 최대 길이는 1,000**

**예외 케이스(Edge Case):**

- 문자열의 길이가 0이면, 0 반환
- abababa와 같은 경우
- aaaabbb와 같이 이미 연속된 경우, a의 갯수를 센 뒤 k와 윈도우 안의 k개수가 같으면 break 하고 0

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. a의 개수를 센다. (k라 정의)
2. k만큼의 윈도우를 지정하고, 해당 윈도우 내부의 a의 개수를 센다.
   1. k - a의 개수가 스왑의 횟수가 되고, 윈도우를 이동해가며 최소 횟수를 찾아나간다.

**예상 시간/공간 복잡도: O(N), O(1)**

### 3. 의사코드 & 검증

```jsx
const k = 문자열에서 a의 총 개수를 센다.
// ec: k <= 1 return 0

const N = string.length

let start = 0, end = k - 1// 윈도우의 범위(인덱스)
let maxChar = 0
let window = 0

for(let i = 0; i < k; i++)
	if(string[i] === "a") :
			window++

while(start <= N)
		if(string[start++] === "a")
				window--;
		if(string[++end % N] === "a")
				window++;
		maxChar = Math.max(window, maxChar)


		return maxChar

```

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const string = fs.readFileSync(filePath).toString().trim();

function solution(string) {
  const N = string.length;
  const k = string.split("a").length - 1;

  if (k <= 1) return 0;

  let start = 0;
  let end = k - 1;
  let maxChar = 0;
  let window = 0;

  for (let i = 0; i < k; i++) {
    if (string[i] === "a") {
      window++;
    }
  }

  while (start < N) {
    if (string[start++] === "a") window--;
    if (string[++end % N] === "a") window++;

    maxChar = Math.max(window, maxChar);
  }

  return k - maxChar;
}
console.log(solution(string));
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점:**

- 자바스크립트 엔진(V8)의 메모리 할당 방식 (원시 타입은 콜 스택, 참조 타입인 배열/객체는 메모리 힙에 저장됨).
- 가비지 컬렉터(GC)의 동작 원리는 단순한 '시간 경과'가 아니라, 루트(Root)로부터의 '도달 가능성(Reachability)'을 기준으로 작동한다는 CS 지식을 확립함. 정보처리기사 등에서 다루는 운영체제 및 메모리 관리 지식과 실제 JS 엔진의 동작을 연결해 볼 수 있었음.
- 해제하지 않은 이벤트 리스너 등이 프론트엔드 웹 환경에서 메모리 누수를 일으킬 수 있다는 점을 인지함.
