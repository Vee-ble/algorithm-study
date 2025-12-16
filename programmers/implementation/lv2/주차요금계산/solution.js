function solution(fees, records) {
  const inTimeMap = new Map(); // 차량번호 -> 입차시각
  const totalTimeMap = new Map(); // 차량번호 -> 누적 주차시간

  for (let i = 0; i < records.length; i++) {
    const [timestamp, carNumber, status] = records[i].split(" ");

    if (status === "IN") {
      inTimeMap.set(carNumber, timestamp);
    } else {
      updateTotalTime(inTimeMap, totalTimeMap, carNumber, timestamp);
      inTimeMap.delete(carNumber);
    }
  }

  // 아직 출차하지 않은 차량 처리
  if (inTimeMap.size > 0) {
    for (const [carNumber, _] of inTimeMap.entries()) {
      updateTotalTime(inTimeMap, totalTimeMap, carNumber);
    }
  }

  const answer = [...totalTimeMap.entries()]
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([_, totalDuration]) => calculateFee(fees, totalDuration));

  return answer;
}

// timestamp(시각)을 받아서 duration(소요시간)을 반환한다는 의미
function calculateDuration(inTimestamp, outTimestamp = "23:59") {
  const [inHour, inMin] = inTimestamp.split(":");
  const [outHour, outMin] = outTimestamp.split(":");

  const inMinutes = Number(inHour) * 60 + Number(inMin);
  const outMinutes = Number(outHour) * 60 + Number(outMin);

  return outMinutes - inMinutes;
}

function calculateFee(fees, totalDuration) {
  const [baseTime, baseFee, unitTime, unitFee] = fees;

  if (totalDuration <= baseTime) return baseFee;

  return baseFee + Math.ceil((totalDuration - baseTime) / unitTime) * unitFee;
}

function updateTotalTime(inTimeMap, totalTimeMap, carNumber, outTimestamp) {
  const inTimestamp = inTimeMap.get(carNumber);

  const parkingDuration = calculateDuration(inTimestamp, outTimestamp);

  const currentTotal = totalTimeMap.get(carNumber) || 0;
  totalTimeMap.set(carNumber, currentTotal + parkingDuration);
}
