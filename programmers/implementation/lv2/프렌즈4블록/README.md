**1. 요구사항 분석**

- **요구사항 요약: n(가로) x m(세로)일 때 2 x 2 크기의 문자가 같은 문자일 때 제거하고, 제거된 공간은 윗 문자들로 채워진다. 같은 문자들로 이루어진 2 x 2 블록이 여러 개라면 한번에 제거.**
- **제약 사항(Constraints): 2 ≤ n, m ≤30**
- **입출력 예시 분석:**
  - m = 4, n = 5
  CCBDE BDE
  AAADE -> ADE
  AAABF CCABF
  CCBBF CCBBF
- **예외 케이스(Edge Case):**

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):**
  1. Find:(i, j)를 기준으로 오른쪽, 아래, 대각선 아래 4칸이 모두 같은지 검사. 같다면 이 4개 좌표 저장(중복 좌표 제거를 위한 Set 이용.)
  2. Delete: 저장된 좌표들의 값을 빈 문자열로 변경.
  3. Drop: 공간을 메움.
     1. 각 열 별로 처리해 아래서 부터 살아남은 블록으로 채우고 나머지 빈 문자열로 채움.
- **선택한 자료구조 근거:**
  - 선택: board를 2차원 배열로 변경, deleteSet(삭제할 좌표 row,col 저장, 중복 자동 제거)
  - 이유: 2차원 배열로 변경하는 이유는 문자열은 불변이라 특정 인덱스만 바꾸거나 지우기 힘듦. set을 이용하는 이유는 좌표를 중복 저장하지 않음.
- **Trade-off 분석:**
- **예상 시간/공간 복잡도:**
- 데이터 흐름 시각화:

### 3. 의사코드 & 검증

```jsx
1. board를 2차원 배열로 변환: board.map(row => row.split(""))

2. while(true) 무한 루프
	deleteSet = new Set() 이번 턴에 지울 좌표 저장

	// Find 2x2 블록 찾기
	// i는 n-2, j는 m-2까지만 돌면 됨. 오른쪽/아래를 확인하니까
	for i from 0 to n-2
		for j from 0 to m-2
			val = borad[i][j]
			if val === ""이면 continue
			if (i,j) (i,j+1) (i+1,j) (i+1, j+1) 이 모두 같다면?
				deleteSet에 네 좌표 모두 추가(문자열 "i,j" 형태)
		if deleteSet.size === 0 -> break;

		// Delete 좌표에 있는 값 지우기
		총 지운 개수 += deleteSet.size
		Set에 있는 모든 좌표 (i,j)에 대해 -> board[i][j] = "" 처리

		// Drop 블록 내리기
		// 모든 열(j)에 대해 반복
		for j from 0 to n-1
			tempStack = []
			for i from 0 to m-1
				if(board[i][j] !== "")tempStack.push(board[i][j])

			for k from m-1 to 0
				board[i][k] = tempStack.pop() ?? ""

	return 총 지운 개수

```

- **Dry Run (손으로 돌려보기):** `(작성한 의사코드에 예제 입력을 넣어 변수 변화 추적)`

### **4. 최종 구현 코드**

```jsx
function solution(m, n, board) {
  board = board.map((row) => row.split(""));
  let deletedCount = 0;

  while (true) {
    const deleteSet = new Set();
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        const val = board[i][j];
        if (!val) continue;
        if (
          val === board[i][j + 1] &&
          val === board[i + 1][j] &&
          val === board[i + 1][j + 1]
        ) {
          deleteSet.add(`${i},${j}`);
          deleteSet.add(`${i},${j + 1}`);
          deleteSet.add(`${i + 1},${j}`);
          deleteSet.add(`${i + 1},${j + 1}`);
        }
      }
    }
    if (!deleteSet.size) break;

    deletedCount += deleteSet.size;
    deleteSet.forEach((e) => {
      const [rowI, colI] = e.split(",");
      board[rowI][colI] = "";
    });

    for (let j = 0; j < n; j++) {
      const tempStack = [];
      for (let i = 0; i < m; i++) {
        if (board[i][j]) tempStack.push(board[i][j]);
      }

      for (let k = m - 1; k >= 0; k--) {
        board[k][j] = tempStack.pop() ?? "";
      }
    }
  }
  return deletedCount;
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

- **발생한 문제(Trouble):** 1. 실행 시간 초과
- **해결 과정(Shooting):** for문의 조건이 잘못되어 while문이 올바르게 동작하는 것을 막았다. for문 조건을 올바르게 수정하여 해결.
- **새롭게 알게 된 점:** set.forEach는 set요소들을 반환하는 반복 메서드. js의 문자열은 불변성을 가져 index로 접근하여 변환하는 것이 불가능하다는 것.
- **아쉬운 점 & 리팩토링 계획:** 스스로 의사코드와 해결 전략을 떠올리지 못했음.
  보드의 크기가 매우 커졌을 때 Set에 저장하는 것은 메모리나 성능 측면에서 오버헤드이다. 대안으로는?
  board와 같은 크기의 방문 배열로 처리한다.
  tempStack을 사용하지 않고, In-Place 방식으로 구현한다면?
  two pointer 사용.
