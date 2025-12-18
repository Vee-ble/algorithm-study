**1. 요구사항 분석**

- **요구사항 요약: 양의 정수 n을 k진수로 바꿨을 때 다음 조건에 맞는 소수가 몇 개인지 구하라.**
  - 0P0 처럼 소수 양쪽에 0이 있는 경우
  - P0처럼 소수 오른쪽에만 0이 있고, 왼쪽에는 아무것도 없는 경우
  - 0P처럼 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우
  - P처럼 소수 양쪽에 아무것도 없는 경우
  - 단, P는 각 자릿수에 0을 포함하지 않는 소스.
- **제약 사항(Constraints): 1 ≤ n ≤ 1,000,000 , 3 ≤ k ≤ 10**
- **입출력 예시 분석:**
  - n을 k진법으로 변환 → 해당 값에서 조건에 맞을 찾음 → 찾은 값을 수를 반환.
- **예외 케이스(Edge Case):**
  - 1일 경우?

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** k진법으로 변환한 수를 문자열로 바꾸고, 0으로 split 함.

split한 배열을 loop하면서 빈 문자열 일 경우 continue, 빈 문자가 아니라면 prime인지 검사.

prime이라면 1 증가, 아니라면 다음 문자 검사.

- **선택한 자료구조 근거:**
  - 선택: `Map` vs `Object`
  - 이유: `(ex: 데이터의 빈번한 삽입/삭제가 필요하므로...)`
- **Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`
- **예상 시간/공간 복잡도: prime을 검사하는 시간이 시간 복잡도가 된다. O(n log n), 공간 복잡도O(n)**
- 데이터 흐름 시각화:

n = 437674, k = 3 → 21102010100011 → "21102010100011” -> ['211', '2', '1','1', '', '','11']

→ 소수 3개 발견

### 3. 의사코드 & 검증

```jsx
1. const conversion -> n을 k진법 수로 변환하고 split. n.toString(k).split("0")
2.  for i of conversion.length
	const val = conversion[i]
	if val === "" continue
	else isPrime(val)
	isPrime 결과에 따라 개수 증가

// 소수 판별 함수
isPrime 함수(n)

```

- **Dry Run (손으로 돌려보기):**

### **4. 최종 구현 코드**

```jsx
function solution(n, k) {
    const conversion = n.toString(k).split("0")
    let count = 0;

    for(let i = 0; i < conversion.length; i++) {
        const val = conversion[i]
        if(val === "") continue;
        else {
            count += isPrime(Number(val))
        }
    }
    **return count
}**

function isPrime(n) {
    if(n === 1) return false
    if(n === 2 || n === 3) return true
    if(n % 2 === 0 || n % 3 === 0) return false

    const sqrt = Math.sqrt(n)
    for(let i = 5; i <= sqrt; i += 6) {
        if(n % i === 0 || n % (i + 2) === 0) {
            return false
        }
    }
    return true
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

- **발생한 문제(Trouble):** isPrime이 올바른 답을 내지 못함.
- **해결 과정(Shooting):** isPrime의 인자의 타입을 string으로 넣어서 올바른 답을 내지 못했음. 문자열 → 숫자로 형 변환하여 인자로 넣어줌.
- **새롭게 알게 된 점: 표현할 수 있는 정수 범위를 넘어서면 BigInt를 사용**
- **아쉬운 점 & 리팩토링 계획:** for문을 of문으로 변경하고, number 형 변환 로직을 분리하고 조건문으로 명시적으로 카운팅하면 가독성이 좋아질 것 같다.
