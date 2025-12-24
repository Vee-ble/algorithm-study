**1. 요구사항 분석**

- **요구사항 요약: 사람 수 N와 M이 주어질 때, 1~N+1 까지의 이름과 N+2부터 마지막까지의 이름 중 중복 포함된 사람 이름을 반환하라. 수와 이름 명단을 사전순으로 출력.**
- **제약 사항(Constraints): 문자열 길이 ≤ 20, N과 M은 500,500 이하의 자연수**
- **입출력 예시 분석:**
- **예외 케이스(Edge Case):**

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** map 이용한다.
- **선택한 자료구조 근거:**
  - 선택: `Map`
  - 이유: 데이터의 삽입 삭제가 빈번하고, has를 통해 데이터 존재 유무를 확인할 수 있고, 요소의 개수를 size로 확인 가능하기 때문
- **Trade-off 분석:** object를 사용하는 방법 뿐인데, map이 더 적절한 것 같다.
- **예상 시간/공간 복잡도: O(N), O(N)**
- 데이터 흐름 시각화:

### 3. 의사코드 & 검증

```jsx
1. const nameMap = new Map()
const result = [] // 교집합인 이름을 저장해둔다.
2. N번 loop
	if(nameMap.has(이름)) continue
	else nameMap.set
3. M번 loop
	if(nameMap.has(이름))
		result.push
		nameMap.delete(이름)

4.
result.length 반환
result.sort 하여 출력
```

- **Dry Run (손으로 돌려보기): (했음)**

### **4. 최종 구현 코드**

```jsx
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const N = +input[0].split(" ")[0];

const nameMap = new Map();
const result = [];

for (let i = 1; i < input.length; i++) {
  const name = input[i];

  if (i <= N) nameMap.set(name, 1);
  else if (nameMap.has(name)) result.push(name);
}
console.log(
  result.length + "\n" + result.sort((a, b) => a.localeCompare(b)).join("\n")
);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

- **발생한 문제(Trouble):** for문을 돌 때 문자열 n이 들어가서 for문이 제대로 돌지 않음
- **해결 과정(Shooting):** for문 조건문에 사용되는 n을 형변환.
- **아쉬운 점 & 리팩토링 계획:** 변수 타입을 잘 확인하자.
