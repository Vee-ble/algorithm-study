**1. 요구사항 분석**

- **요구사항 요약: 주차장 요금표로 차량별 주차 요금을 계산하라. 출차된 내역이 없다면 23:59에 출차된 것으로 간주.**
  - 초과한 시간이 단위 시간으로 나누어 얼어지지 않으면 올림.
- **제약 사항(Constraints):**
  - fees(요금)의 길이 4, [기본 시간(분), 기본 요금(원), 단위 시간(분), 단위 요금(원)] = fees
  - 1≤records.len≤10,000
    - “시각 차량번호 내역” 공백으로 구분.
    - 시각 HH:MM, 차량번호 0~9 길이 4인 문자열
    - 내역은 IN || OUT 인 문자열,
- **입출력 예시 분석:**
- **예외 케이스(Edge Case):**
  -

### **2. 해결 전략 및 자료구조 설계**

- **해결 전략 (Algorithm):** records를 분해했을 때 IN일 경우 map에 차량번호(key): 시간(value) 형태로 저장한다. OUT일 경우 해당 차량번호로 map으로부터 데이터를 얻어서 요금을 계산한다. 이를 반복으로 수행하고, 반복이 종료됐을 때 map에 값이 있다면 전부 23:59 출차로 나머지를 계산한다.
- **선택한 자료구조 근거:**
  - 선택: map
  - 이유: key, value 형태로 저장하기 적절하고 삽입, 삭제, 조회 등 효율적이다.
- **Trade-off 분석:** object로도 구성할 수 있다. 성능상 큰 차이는 없을 것 같다.
- **예상 시간/공간 복잡도: O(N), O(N)**
- 데이터 흐름 시각화:

### 3. 의사코드 & 검증

`+`는 중간에 추가한 부분.

```jsx
1. recordMap -> map 선언. 차량번호:시각 형태로 저장.
+ feeMap -> map 선언. 차량번호:요금 형태로 저장
3. records를 loop한다. for or map
	4. 시간, 번호, 내역으로 요소를 분리한다.
	5. if(내역 === "IN")
		recordMap에 저장
	6. else
		번호로 recordMap의 입차 시간을 불러오고, calculateFee함수로 계산 결과를 반환.

final -> map을 이용하면 loop 자체를, 아니라면 하나의 배열에 결과 push.

2. calculateFee(fees, in, out=23:59) -> 요금을 계산하는 함수. in은 출입, out은 출차시간
```

- **Dry Run (손으로 돌려보기):**

records loop

입력1: "16:00 3961 IN” recordMap 에 저장.

입력2: "16:00 0202 IN” recordMap 에 저장.

입력3: "18:00 3961 OUT” recordMap에 저장된 3961번호의 입차 시간을 가져와서 요금복

이 과정 반복

### **4. 최종 구현 코드**

```jsx
function solution(fees, records) {
  const recordMap = new Map();
  const timeMap = new Map();

  for (let i = 0; i < records.length; i++) {
    const [time, number, status] = records[i].split(" ");
    if (status === "IN") {
      recordMap.set(number, time);
    } else {
      const calcTime = calculateTime(recordMap.get(number), time);
      timeMap.has(number)
        ? timeMap.set(number, timeMap.get(number) + calcTime)
        : timeMap.set(number, calcTime);
      recordMap.delete(number);
    }
  }

  if (recordMap.size > 0) {
    for (const [number, inTime] of recordMap.entries()) {
      const calcTime = calculateTime(recordMap.get(number));
      timeMap.has(number)
        ? timeMap.set(number, timeMap.get(number) + calcTime)
        : timeMap.set(number, calcTime);
    }
  }

  const answer = [...timeMap.entries()]
    .sort((a, b) => a[0] - b[0]) // 번호가 작은 순서대로 정렬 (문자열이지만 뺄셈으로 숫자 비교 가능)
    .map(([number, totalTime]) => calculateFee(fees, totalTime));
  return answer;
}

function calculateTime(inTime, outTime = "23:59") {
  const [inHour, inMin] = inTime.split(":");
  const [outHour, outMin] = outTime.split(":");

  const totalInTime = Number(inHour) * 60 + Number(inMin);
  const totalOutTime = Number(outHour) * 60 + Number(outMin);
  const totalTime = totalOutTime - totalInTime;

  return totalTime;
}

function calculateFee(fees, totalTime) {
  const [baseTime, baseFee, unitTime, unitFee] = fees;

  if (totalTime <= baseTime) return baseFee;
  else {
    return baseFee + Math.ceil((totalTime - baseTime) / unitTime) * unitFee;
  }
}
```

### 5. 트러블 슈팅 & 회고 (Retrospective)

- **발생한 문제(Trouble): 1.** 올바르지 못한 계산 식 이용 2. 누적 계산을 단일 계산으로 처리.
- **해결 과정(Shooting): 올바른 계산 식으로 수정, 누적 계산 처리를 위한 map 사용**
- **새롭게 알게 된 점:** map을 entries와 sort를 이용하여 정렬 가능하다는 것.
- **아쉬운 점 & 리팩토링 계획:** 누적 주차 시간을 계산하는 문제 내용을 제대로 파악하지 않았음. 계산식을 제대로 구하지 못했음, 24라인 a[0] - b[0] 부분에서 문자열을 정렬할 때 자동 형변환으로 정렬이 정상적으로 작동하지만 명시적으로 Number(a[0]) - Number(b[0]) 혹은 a[0].localeCompare(b[0])를 쓰는 것이 더 안전해 보임. number, time과 같은 변수 명과 삼항 연산자 사용한 부분이 명확해보이지 않음. updateTotalTime으로 같은 로직은 함수형으로 분리.
