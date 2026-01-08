### **1. 요구사항 분석**

**요구사항 요약:**

**한개의 회의실 N개의 회의**

각 회의 I의 시작 시간, 끝나는 시간

각 회의가 겹치지 않게 회의실을 사용할 수 있는 회의 최대 개수.

단, 회의 중단 불가능. 끝나는 것과 동시에 다음 회의 시작 가능

끝나는 시간=시작시간인 경우는 시작하자마자 끝나는 것.

### **2. 해결 전략 및 자료구조 설계**

**해결 전략 (Algorithm):**

회의가 끝나는 시간을 기준으로 오름차순 정렬한다. 회의가 빨리 끝나야 남은 시간대에 다른 회의 하나라도 더 배정한다. 끝나는 시간이 이른 회의부터 선택(끝시간 업데이트, count 증가)해간다. 끝시간보다 시작시간이 더 작으면 건너뛴다. 이 과정을 마지막까지 반복하고 count 반환.

**예상 시간/공간 복잡도: O(N), O(1)**

데이터 흐름 시각화:

```
끝변수 = 0, count = 0
[1, 4]  끝 변수: 4, count: 1
[3, 5] 시작 3 <= 끝 4, 건너뜀
[0, 6] 시작 0 <= 끝 4, 건너뜀
[5, 7] 시작 5 >= 끝 4, 끝 변수: 7, count: 2
[3, 8] 시작 3 <= 끝 7, 건너뜀
[5, 9] 시작 5 <= 끝 7, 건너뜀
[6, 10] 시작 6 <= 끝 7, 건너뜀
[8, 11] 시작 8 >= 끝 7, 끝 변수: 11, count: 3
[8, 12] 시작 8 <= 끝 11, 건너뜀
[2, 13] 시작 2 <= 끝 11, 건너뜀
[12, 14] 시작 12 >= 끝 11, 끝 변수: 12, count: 4
```

### 3. 의사코드 & 검증

```jsx
1. const endTime = 0, count = 0;
2. for conference of conferences
	const confStartTime, confEndTime
	if(endTime <= confStartTime) // endTime와 count 업데이트
	else // continue
3. return count
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
const N = input[0];

const conferences = input
  .slice(1, N + 1)
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => a[1] - b[1] || a[0] - b[0]);

let endTime = 0,
  count = 0;

for (let i = 0; i < N; i++) {
  const [confStartTime, confEndTime] = conferences[i];
  if (endTime <= confStartTime) {
    endTime = confEndTime;
    count++;
  } else continue;
}

console.log(count);
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

발생한 문제
정렬 기준 누락: 종료 시간만 고려했다가 [4, 4], [2, 4] 같은 케이스에서 오답 발생.
해결: a[1] - b[1] || a[0] - b[0]로 2차 정렬 조건 추가.

📚 새롭게 알게 된 점 (Deep Dive)
고성능 I/O 및 메모리 구조:
fs.readFileSync(0)로 버퍼째 읽고 Uint32Array를 사용하면 파싱 속도와 메모리 효율을 극대화할 수 있다.
리틀 엔디안(Little Endian) 시스템에서는 64비트 정수 하나가 [Low 32bit, High 32bit] 순서로 저장된다.
이를 이용해 [Start, End] 쌍을 BigUint64Array로 해석하여 sort()하면, 상위 비트인 End가 1순위 정렬 키, 하위 비트인 Start가 2순위 정렬 키가 되어 한 방에 정렬되는 원리를 배움.

🚀 개선할 점
시간 복잡도를 계산할 때 정렬(sort) 비용을 누락하지 말자.
