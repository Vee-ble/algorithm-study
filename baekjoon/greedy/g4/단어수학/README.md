### **1. 요구사항 분석**

**요구사항 요약: 대문자 알파벳으로 된 단어의 각 알파벳을 0~9까지의 숫자 중 하나로 바꿔 숫자의 합을 구한다.**

**제약 사항(Constraints): 단어의 개수 1 ≤ N ≤ 10, 단어에 포함된 알파벳은 최대 10개, 수의 최대 길이는 8**

**입출력 예시 분석:**

- N = 2, Alphabet = AAA, AAA
- A = 9로 두고, 합은 1998

**예외 케이스(Edge Case):**

- 가장 높은 자릿수에 위치한 알파벳이 아닌 곳에 한 알파벳이 반복적으로 나타날 때 (ABBB, CBBB, …)
  - 반복적인 알파벳에 높은 수를 두는 것이 유리하다. (N = 10)
- 단어의 길이가 제각각일 때 (ABB, BB, BB, BB, BB, BB…)
- 10개의 알파벳이 모두 쓰여서 어떤 알파벳은 반드시 0을 가져가야할 때
  - A, B, C, D, E, F, G, H, I, J

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

길이가 가장 긴 문자열의 index부터 시작하여 해당 알파벳의 가중치를 map에 저장한다.

**선택한 자료구조 근거: key, value형태로 해당 알파벳의 가중치를 map에 저장하는 것이 알맞고, map의 메서드들은 값을 추출하거나 정렬하기에 알맞다.**

**예상 시간/공간 복잡도: O(N x 문자열 최대 길이), O(1)**

### 3. 의사코드 & 검증

```jsx
const alphMap = new Map()

길이가 가장 긴 문자열의 길이를 구함. L

let curPosition = 현재 자릿수를 저장해둘 변수(default L)

for i = 0 to L
	모든 문자열을 돈다.
		현재 단어의 길이 === curPosition이면
			alphMap.set(현재 단어[i], (alphMap.get(현재 단어[i]) || 0) + 10 ** (curPosition -1)
			curPosition--;


// alphMap엔 모든 가중치가 구해졌음.
// map value를 내림차순 기준으로 정렬.

for [key, value] of map
	문자들을 replace함.

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

const words = input.slice(1);

const alphMap = new Map();

for (let j = 0; j < N; j++) {
  const word = words[j];
  for (let i = 0; i < word.length; i++) {
    alphMap.set(
      word[i],
      (alphMap.get(word[i]) || 0) + 10 ** (word.length - i - 1),
    );
  }
}

const sorted = [...alphMap.entries()].sort((a, b) => b[1] - a[1]);

let sum = 0;
let position = 9;

for (const [key, val] of sorted) {
  sum += val * position;
  position--;
}
console.log(sum);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제 (Trouble):** 초기에는 '가장 높은 자릿수에 위치한 알파벳에 무조건 높은 숫자를 배정한다'는 직관적인 그리디 접근을 시도했다. 하지만 다른 자리에 특정 알파벳이 여러 번 반복적으로 나타날 경우, 실제 전체 합산 시 수학적 가중치가 역전되는 논리적 함정(반례)이 존재함을 발견했다.

**해결 과정 (Shooting):** 단순 자릿수 비교가 아닌, 각 알파벳이 위치한 자릿수에 따라 10의 거듭제곱(10^N) 형태로 가중치를 누적 계산하는 방식으로 로직을 수정했다. 누적된 가중치가 높은 순으로 9부터 0까지의 숫자를 배정했다. 또한, 최종 정답을 도출할 때 기존 문자열을 다시 순회하며 숫자로 치환(`replace`)하는 무거운 연산 대신, `정렬된 가중치 * 할당 숫자`를 곱해서 더하는 방식으로 O(1)에 가깝게 최적화하여 즉각적인 답을 도출해냈다.

**새롭게 알게 된 점:** JavaScript에서 `Map` 객체의 값들을 기준으로 내림차순 정렬을 수행할 때, `[...map.entries()].sort((a, b) => b[1] - a[1])` 패턴을 활용하는 우아한 문법을 확실히 익혔다.

**아쉬운 점 & 리팩토링 계획:** 초기 구현에서는 가장 긴 단어의 최대 길이를 굳이 구한 뒤, 그 길이를 기준으로 순회하며 `if`문으로 문자의 존재 여부를 매번 검사하는 비효율적인 구조를 짰다. 이후 각 단어 자체의 길이를 기준으로 독립적인 순회를 돌도록 리팩토링하여 불필요한 방어 로직을 제거했다. 앞으로 코드를 작성할 때, 내가 짠 `if`문이나 이중 반복문 구조가 정말 최적인지, 더 직관적으로 줄일 방법은 없는지 항상 의심하고 점검하는 습관을 들여야겠다.
