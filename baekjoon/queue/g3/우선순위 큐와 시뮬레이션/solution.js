const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const [N, K, T] = input[0].split(" ").map(Number);

// 1. 초기 배열 전처리: K보다 큰 값이 들어올 수 있으므로 미리 K로 나눈 나머지만 저장합니다.
// 이 전처리가 있어야 아래의 정렬이 올바르게('나머지 세계' 기준으로) 수행됩니다.
const originArr = input[1].split(" ").map((x) => Number(x) % K);
const queryArr = input[2].split(" ").map(Number);

// 2. 오름차순 정렬: 이분 탐색을 사용하기 위한 필수 대전제.
originArr.sort((a, b) => a - b);

let totalAdd = 0; // 지금까지 더해진 쿼리 값들의 누적합 (오버플로우 방지를 위해 K 미만으로 유지됨)
let result = []; // 각 쿼리마다의 최댓값을 저장할 배열

// 3. 시뮬레이션 시작: T번의 쿼리를 순회합니다.
for (let i = 0; i < T; i++) {
  let curMax = -1;
  const query = queryArr[i];

  // [핵심 1] 상태 갱신: 배열 원소들을 직접 건드리는 미련한 짓을 피하고, 누적합만 안전하게 업데이트합니다.
  // (주의: 만약 query에 음수가 들어오는 문제라면 (((totalAdd + query) % K) + K) % K 로 방어해야 합니다.)
  totalAdd = (totalAdd + query) % K;

  // [핵심 2] 이분 탐색: K를 넘지 않고 살아남은(안 깎인) 그룹의 대장 찾기
  let left = 0;
  let right = N - 1;
  let idx = -1; // 안 깎인 그룹 대장의 인덱스 (전부 다 깎여서 못 찾으면 -1을 유지)

  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 자바스크립트의 실수형 나눗셈 함정 방어

    // 현재 원소의 진짜 값(원래 값 + 누적합)이 K를 넘지 않는다면 (안 깎였다면)
    if (originArr[mid] + totalAdd < K) {
      idx = mid; // 이 녀석을 일단 대장 후보로 등록하고
      left = mid + 1; // 더 큰 녀석이 있는지 오른쪽 절반을 계속 탐색하며 범위를 좁힙니다.
    } else {
      // K를 넘어버려서 깎이는 녀석이라면
      right = mid - 1; // 더 작은 녀석들이 있는 왼쪽 절반으로 도망가서 탐색합니다.
    }
  }

  // [핵심 3] 결괏값 도출 및 최종 승자 비교
  let c1 = -1;
  // 후보 1: 안 깎인 그룹의 대장을 찾았다면, 그 녀석의 진짜 결괏값을 계산합니다.
  if (idx !== -1) {
    c1 = (originArr[idx] + totalAdd) % K;
  }

  // 후보 2: 깎인 그룹의 대장.
  // 정렬된 배열의 맨 마지막 원소는 K만큼 깎이는 페널티를 받더라도, 깎인 그룹 내에서는 무조건 가장 큽니다.
  const c2 = (originArr[N - 1] + totalAdd) % K;

  // 두 대장 중 더 큰 값을 현재 쿼리의 정답으로 채택합니다.
  curMax = Math.max(c1, c2);
  result.push(curMax);
}

console.log(result.join(" "));
