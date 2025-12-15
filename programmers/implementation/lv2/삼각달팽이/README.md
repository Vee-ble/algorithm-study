**1. 요구사항 분석**

- **요구사항 요약: 밑변과 높이가 n인 삼각형에서 반시계 방향으로 요소를 채워나간다.**
- **제약 사항(Constraints): 1 ≤ n ≤ 1000**
- **입출력 예시 분석:**
  - Input: 정수 n(1~1000)
  - Output: 1차원 정수 배열
  - 중간 데이터 구조:
    - 1차원 배열로는 해결이 힘들기에 n행을 가진 2차원 배열 형태가 필요.
    - 각 행의 길이는 1,2,3,4로 증가

시각화:

```jsx
Row 0: [1]
Row 1: [2,9]
Row 2: [3,10,8]
Row 3: [4,5,6,7]
flat: [1, 2, 9, 3, 10, 8, 4, 5, 6, 7]
```

- **예외 케이스(Edge Case):**
  - n = 1 일 때, [1] 반환

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

- 2차원 배열을 우선 0으로 채워 형태를 갖는다. 0이 아닌 곳은 이미 방문한 것으로 판별.

```jsx
if n = 4
[
[0],
[0,0],
[0,0,0],
[0,0,0,0],
]
```

- 각 행을 채워나가는데

[0][0] → [1][0] → [2][0] → [3][0] → [3][1] → [3][2] → [3][3] → [2][2] → [1][1] →[2][1]

방향 정의 : dr(행 변화량), dc(열 변화량)

아래(+1, 0) → 오른쪽(0, +1) → 대각선 위(-1, -1)

**선택한 자료구조 근거:**

- 선택: 2차원 배열
- 이유: n행 n열의 격자판이 필요하고, 처음에는 0으로 초기화한 뒤 0이 아닌 곳은 이미 방문한 것으로 판별.
- **Trade-off 분석:** `(다른 방법과 비교했을 때 현재 방법의 장단점)`
- **예상 시간/공간 복잡도: O(N^2), O(N^2)**
- 데이터 흐름 시각화: 위와 동일
- 로직 설계

1. 방향 정의 : dr(행 변화량), dc(열 변화량)
   1. 아래(+1, 0) → 오른쪽(0, +1) → 대각선 위(-1, -1)
2. 종료 조건: 채워야 할 숫자가 총 개수(n\*(n+1)/2)을 넘으면 종료
3. 이동 규칙:
   1. 다음 좌표 미리 계산(nr, nc)
   2. 조건 A: 배열 범위를 벗어나는가?
   3. 조건 B: 해당 칸 값이 0이 아닌가?
   4. 위 조건이 걸리면 방향을 다음 순서로 변경해 좌표를 다시 계산
   5. 조건에 안걸리면 해당 좌표로 이동 후 숫자 채우기

### 3. 의사코드 & 검증

```jsx
/*
twoDimArr= 0으로 채워진 n행 n열 배열 생성.
twoDimArr[0][0] = 1
filling = 2, 채워야 할 숫자. n*(n+1)/2를 넘으면 종료
directions = [[1,0], [0,1], [-1-1]]
curDirection = 0 -> 적용해야 할 directions index값
curPosition = [0, 0] // 현재 좌표 값

while filling <= n*(n+1)/2
	curPosition으로 curDirection을 적용한 새로운 좌표 nr, nc 생성
	if nr, nc가 배열 범위를 벗어나고 해당 칸 값이 0이 아니라면 
		curDirection++
		continue
	else
		curPosition 업데이트,
		twoDimArr = filling
		filling++
		
	
*/
```

- **Dry Run (손으로 돌려보기):**

```jsx
n = 4
각 변수 선언 및 초기화

while 2 <= 10
	반복 1. 새 좌표 nc = 1, nr = 0
	else 문 실행
		curPosition = [nc, nr] (1,0)
		2행 1열이 2로 채워짐
		다음 채울 값 3으로 업데이트

	반복 2. 새 좌표 nc = 2, nr = 0
	else 문 실행
		curPosition = [nc, nr] (2,0)
		3행 1열이 3로 채워짐
		다음 채울 값 4으로 업데이트

		반복 3. 새 좌표 nc = 3, nr = 0
		else 문 실행
			curPosition = [nc, nr] (3,0)
			4행 1열이 4로 채워짐
			다음 채울 값 5으로 업데이트

		반복 4. 새 좌표 nc = 4, nr = 0
		if 문 실행
			curDirection 1 증가. 반복 다시
		반복 5. 새 좌표 nc = 3, nr = 1
		else 실행
			curPosition = [nc, nr] (3,1)
			3행 1열이 5로 채워짐
			다음 채울 값 6으로 업데이트


		계속 진행..
```

### **4. 최종 구현 코드**

```jsx
function solution(n) {
  if (n === 1) return [1];

  const twoDimArr = Array.from({ length: n }, (_, i) => Array(i + 1).fill(0));
  twoDimArr[0][0] = 1;
  let filling = 2;
  let directions = [
    [1, 0],
    [0, 1],
    [-1, -1],
  ];
  let curDirection = 0;
  let curPosition = [0, 0];
  while (filling <= (n * (n + 1)) / 2) {
    const nr = curPosition[0] + directions[curDirection % 3][0];
    const nc = curPosition[1] + directions[curDirection % 3][1];

    if (twoDimArr[nr]?.[nc] === undefined || twoDimArr[nr]?.[nc] !== 0) {
      curDirection++;
      continue;
    } else {
      curPosition[0] = nr;
      curPosition[1] = nc;
      twoDimArr[nr][nc] = filling;
      filling++;
    }
  }
  return twoDimArr.flat();
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

- **발생한 문제(Trouble):**
  1. curDirection % 3 처리를 해주지 않아서, undefined인 값에서 [0]을 읽으려 했다.
  2. twoDimArr[nr][nc]에서 undefeind인 값에서 [nc]를 읽으려 했다.(위와 같은 문제)
  3. twoDimArr를 1차원 배열로 풀려고 할 때 방법을 떠올리지 못했다.
- **해결 과정(Shooting):**
  1. % 3 처리
  2. [nr]?.[nc]로 옵셔널 체이닝 처리
- **새롭게 알게 된 점:** flat 메서드, 2차원 배열에서 행렬의 이동 방향을 미리 정해두고, 움직이는 전략
- **아쉬운 점 & 리팩토링 계획:** 초기 설정 부분과 변수가 복잡해 보임.
