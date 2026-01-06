### **1. 요구사항 분석**

**요구사항 요약: A 좌표 값들을 (x,y)만큼 이동했을 때 모든 좌표가 B에 포함되는 (x,y) 좌표 구하기.**

**제약 사항(Constraints):**

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):** B 좌표를 loop하면서 Set에 넣고, 특정 A좌표와 연산을 수행하여 두 좌표의 차를 모두 저장한다.(배열)

두 좌표의 차를 저장한 배열을 loop 하면서, 모든 A에 적용하여 Set에 존재하는지 확인. 존재 하지 않으면 break

**선택한 자료구조 근거:**

- 선택: Set
- 이유: has로 접근 가능.

**Trade-off 분석:**

**예상 시간/공간 복잡도: O(N), O(N)**

데이터 흐름 시각화:

### 3. 의사코드 & 검증

```jsx
1. A 좌표를 [[x1,y1],[x2,y2]인 2차원 배열 형태로 저장
2. B 좌표를 loop
	Set에 저장[bx1, by2[
	A[0] 좌표와 B좌표를 뺀 값을 diff 배열에 저장(2차원)
3. diff loop
	A loop하여 diff 값을 적용학, B Set.has로 확인 없으면 break;
	diff 반환
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

const m = Number(input[0]);

const constellation = [];

for (let i = 1; i <= m; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  constellation.push({ x, y });
}

const nIndex = m + 1;

const stars = [];
const skySet = new Set();

for (let i = nIndex + 1; i < input.length; i++) {
  if (!input[i]) continue;
  const [x, y] = input[i].split(" ").map(Number);
  stars.push({ x, y });
  skySet.add(`${x},${y}`);
}

const firstStar = constellation[0];

for (let i = 0; i < stars.length; i++) {
  const currentSkyStar = stars[i];

  const dx = currentSkyStar.x - firstStar.x;
  const dy = currentSkyStar.y - firstStar.y;

  let isMatch = true;

  for (let j = 0; j < m; j++) {
    const cx = constellation[j].x + dx;
    const cy = constellation[j].y + dy;

    if (!skySet.has(`${cx},${cy}`)) {
      isMatch = false;
      break;
    }
  }

  if (isMatch) {
    console.log(`${dx} ${dy}`);
  }
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

**새롭게 알게 된 점:** set에 배열을 비교할 때 기존 배열과 새 배열의 주소값이 다르다면 다른 값으로 취급하기에 문자열로 처리.

**아쉬운 점 & 리팩토링 계획:** 단계를 쪼개가며 작은 단위로 생각할 필요가 있을 것 같다.

1. 자바스크립트 `Set`이나 `Map`이 내부적으로 키의 동등성(Equality)을 판단할 때 사용하는 알고리즘은 무엇인가? (`==`, `===`, 아니면 다른 것?)

- `Set`과 `Map`은 **SameValueZero**라는 알고리즘을 사용합니다.
  - 기본적으로 `===` (일치 연산자)와 거의 같습니다.
  - **차이점:** `===`는 `NaN === NaN`을 `false`로 보지만, `SameValueZero`는 `true`로 봅니다. (즉, `NaN`도 키로 쓸 수 있습니다.)
- **소수점 문제:** 소수점은 부동소수점 오차 때문에 `0.1 + 0.2`가 `0.30000000000000004`가 됩니다. 이를 문자열로 바꾸면 `"0.3000..."`이 되어 `"0.3"`과 다르게 인식되므로 검색에 실패할 수 있습니다. (이럴 땐 `toFixed` 등으로 오차를 없애거나 `epsilon` 비교를 해야 합니다.)

1. 만약 좌표가 정수가 아니라 **소수점(Float)**이 포함된 데이터였다면, 문자열로 변환해서 저장하는 현재 방식(`template literal`)에 **어떤 잠재적인 문제(Precision Issue)**가 발생할 수 있을까?"

**치명적인 문제점:** **메모리 초과 (OOM)**
• 1,000,000 X 1000,000 크기의 `boolean` 배열을 만들면 약 **1TB(테라바이트)**의 메모리가 필요합니다. 일반적인 컴퓨터에서는 절대 불가능합니다.
• 별은 고작 1000개뿐인데 공간을 너무 낭비하죠. 이를 **희소 행렬(Sparse Matrix)**이라고 하며, 이때는 `Set`이나 `Map`이 정답입니다.

**좌표가 작을 때:**
• 100 X 100 정도라면 배열이 훨씬 빠릅니다. 해시 함수 계산 비용이 없고, 메모리 접근 속도(Cache)도 빠르기 때문입니다.
