**1. 요구사항 분석**

- **요구사항 요약: 문자 S가 주어질 때, 숫자가 나오는 경우 가능한 큰 숫자를 찾는다. 즉, 모든 숫자의 앞과 뒤에 문제가 있거나, 줄의 시작 또는 끝이어야 한다. 찾은 모든 숫자를 오름차순으로 정렬하고, 찾은 숫자의 개수가 M개라면 M줄로 출력한다.**

- **제약 사항(Constraints): 첫째 줄에 줄의 개수 (1 ≤ N ≤ 100), 다음 줄에는 줄의 내용.**

S.length≤ 100 이고, S는 알파벳 소문자와 숫자로 이루어짐.

- **입출력 예시 분석:**
  - `lo3za4` , `01` → 1,3,4
- **예외 케이스(Edge Case):**

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** 투 포인터로 문자열을 탐색하여 숫자만 잘라내어 배열에 다음 후 sort하고, loop 돌며 출력한다.
- **선택한 자료구조 근거:**
  - 선택: 투 포인터
  - 이유: 문자열의 길이만큼 O(N) 시간이 들고, 조건에 맞게 문자열을 잘라내기도 편하다.
- **Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`
- **예상 시간/공간 복잡도: O(N), O(N)**
- 데이터 흐름 시각화:
  - `lo3za4` → 투 포인터로 탐색해 나간다. fast와 slow 변수를 이용한다. 첫 문자부터 시작하고, fast는 항상 앞으로 나아간다. slow가 숫자가 아니고, fast가 숫자이면 fast의 위치로 간다. fast가 숫자가 아니고 slow가 숫자라면 잘라내고, slow를 fast의 위치로 간다.
  - fast++
  - if(둘 다 숫자가 아니라면) continue
  - if(slow !== 1~9 && fast === 1~9)
    - slow = fast
  - if(slow === 1~9 && fast !== 1~9)
    - slice
    - slow = fast

l o 3 0z a 4

s

f

[3]

### 3. 의사코드 & 검증

```jsx
1. let slow, fast -> 투 포인터 탐색 포인터(0)
2. const numbers -> 숫자들을 담을 배열([])

3. 줄을 LOOP한다.
	slow, fast 초기화
	4. 해당 문자을 loop 한다.
		fast++
		const slowToNum = Number(S[slow])
		const fastToNum = Number(S[fast])
		const slowIsNum = (slowToNum >= 0 && slowToNum <= 9)
		const fastIsNum = (fastToNum >= 0 && fastToNum <= 9)
		if(!slowIsNum && !fastIsNum)
			continue
		if(!slowIsNum && fastIsNum) slow = fast
		if(slowIsNum && !fastIsNum) slice, slow = fast


```

- **Dry Run (손으로 돌려보기): 손을 이용해서 머릿속으로 했음**

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]); // 첫 줄 개수
const data = input.slice(1); // 나머지 데이터

solution(data);
function solution(list) {
  let slow = 0,
    fast = 0;
  const numbers = [];

  for (let i = 0; i < N; i++) {
    (slow = 0), (fast = 0);
    const string = list[i];
    for (let j = 0; j < string.length; j++) {
      fast++;
      const slowToNum = Number(string[slow]);
      const fastToNum = Number(string[fast]);

      const slowIsNum = slowToNum >= 0 && slowToNum <= 9;
      const fastIsNum = fastToNum >= 0 && fastToNum <= 9;

      if (!slowIsNum && !fastIsNum) continue;
      else if (!slowIsNum && fastIsNum) slow = fast;
      else if (slowIsNum && !fastIsNum) {
        numbers.push(BigInt(string.slice(slow, fast)));
        slow = fast;
      }
    }
  }
  numbers.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  console.log(numbers.join("\n"));
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble) & 해결 (Shooting)**

1. **자료형 한계**: 숫자가 100자리까지 나올 수 있어 `Number` 타입 사용 시 오버플로우 발생.
   - **해결**: `BigInt` 타입을 도입하여 해결.
2. **정렬 오류**: `numbers.sort((a, b) => a - b)`를 사용했으나 `TypeError` 발생.
   - **원인**: `BigInt` 뺄셈 결과는 `BigInt`인데, `sort`는 `Number` 반환을 기대함.
   - **해결**: 삼항 연산자를 이용해 `1, 1, 0` (Number)을 명시적으로 반환하도록 수정.

**새롭게 알게 된 점**

- **정규표현식**: `/\d+/g` 패턴을 사용하면 반복문 없이도 문자열 내의 모든 숫자를 쉽게 배열로 추출할 수 있음을 배움.
- **BigInt와 Sort**: `BigInt` 배열 정렬 시 비교 함수 작성에 유의해야 함.

**개선할 점**

- 문자열 파싱 문제에서는 무조건 투 포인터부터 떠올리기보다, 정규표현식으로 더 간단하게 해결할 수 있는지 먼저 검토하자.
