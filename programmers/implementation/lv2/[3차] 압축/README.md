### **1. 요구사항 분석**

**요구사항 요약: 문자열을 압축한 사전 색인 번호를 배열로 출력하라.**

1. 길이가 1인 모든 단어를 포함하도록 사전 초기화
2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w 찾음.
3. w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w 제거.
4. 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록한다.

**제약 사항(Constraints): 따로 없음.**

**입출력 예시 분석:**

- “KAKAO” → 압축 → [11, 1, 27, 15]

**예외 케이스(Edge Case):**

-

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

1. dictionary(사전)은 map을 이용해 초기화. key = 단어, value는 번호
2. while(i ≤ string.length)로 loop
3. combinedString = 조합된 string을 담고 있을 변수를 선언. string[i]로 초기화
4. while문으로 combinedString이 사전에 있는지 확인. 없다면 종료
5. combinedString + string[k], k = combinedString에서 추가해야할 다음 string index

종료 이후 combinedString을 사전 마지막 요소로 추가(색인 번호는 map.size()+1)

결과 배열에 push, combinedString 초기화 후 종료

**선택한 자료구조 근거:**

- 선택: Map
- 이유: key, value 형태의 데이터가 적절하고, size 메서드로 다음 추가될 요소가 어떤 색인 번호를 가져야 하는 지 간단히 알 수 있음.

**Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`

**예상 시간/공간 복잡도: 기본적으로 최악의 경우 string을 전부 돌아야 하기에 O(n). 내부에 while문이 하나 더 있어도, 한번씩 실행됨. 공간 복잡도 O(N)**

데이터 흐름 시각화:

### 3. 의사코드 & 검증

```jsx
1. const dictionary = new Map(); Key = A-Z, val =  1 - 26
2. let i = 0
3. while(i < string.length)
		let combinedString = string[i]
		while(dictionary.has(combinedString + string[i+1]))
			i++
		4. dictionary.set(combinedString+string[i+1], dictionary.size +1)
		5. result.push(dictionary.get(combinedString)

```

**Dry Run (손으로 돌려보기): 종이로 해봄.**

### **4. 최종 구현 코드**

```jsx
function solution(msg) {
  const dictionary = new Map(
    Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), i + 1])
  );
  let i = 0;
  let result = [];
  while (i < msg.length) {
    let combinedString = msg[i];
    while (msg[i + 1] && dictionary.has(combinedString + msg[i + 1])) {
      combinedString = combinedString + msg[i + 1];
      i++;
    }
    dictionary.set(combinedString + msg[i + 1], dictionary.size + 1);
    result.push(dictionary.get(combinedString));
    i++;
  }
  return result;
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**발생한 문제(Trouble):** 두번째 while문에서 combinedString을 업데이트 하지 않아서 출력 에러 발생

**해결 과정(Shooting):** 실행 과정을 다시 한번 생각하여 문제점을 파악해서 해결했음.

**새롭게 알게 된 점:** Array.from으로 알파벳을 초기화 한 점

**아쉬운 점 & 리팩토링 계획:** combinedString + msg[i+1]을 하나의 변수로 사용해서 가독성 개선, 변수명을 문제의 정의에 맞는 w, c 등으로 로직을 직관적으로 파악
