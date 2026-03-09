const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath, "utf-8").trim().split(/\r?\n/);

const [N, d, k, c] = input[0].split(" ").map(Number);
const sushi = new Int32Array(N);
for (let i = 1; i <= N; i++) {
  sushi[i - 1] = Number(input[i]);
}

const count = new Int32Array(d + 1);
let currentTypes = 0;

// 처음 k개의 초밥으로 초기 윈도우 세팅
for (let i = 0; i < k; i++) {
  if (count[sushi[i]] === 0) {
    currentTypes++; // 처음 먹어본 스시라면 가짓수 증가.
  }
  count[sushi[i]]++;
}

// 초기 윈도우 상태에서의 최댓값 계산 (쿠폰 적용)
let maxTypes = currentTypes;
if (count[c] === 0) {
  maxTypes = currentTypes + 1;
}

// 슬라이딩 윈도우 시작
for (let i = 0; i < N; i++) {
  // 창문 맨 왼쪽에 있던 초밥은 창문에서 벗어남. 초밥 개수 1개 감소.
  const leftSushi = sushi[i];
  count[leftSushi]--;
  if (count[leftSushi] === 0) {
    // 개수를 줄였는데 0이라면, 가짓수도 감수
    currentTypes--;
  }

  // 창문이 이동했으니 창문의 오른쪽 끝에 초밥이 들어옴.
  // i + k는 새로 들어올 초밥의 인덱스. 레일은 둥글기에 배열의 끝을 넘어가면 0번으로 돌아와 야함.
  const rightSushi = sushi[(i + k) % N];
  if (count[rightSushi] === 0) {
    currentTypes++; // 초밥의 개수가 0이 었다면 가짓수 증가
  }
  count[rightSushi]++;

  let currentMax = currentTypes;
  if (count[c] === 0) {
    currentMax++; // 쿠폰 사용
  }

  // 현재 창문에서의 가짓수 > 역대 최고 가짓수 라면 기록 경신
  if (currentMax > maxTypes) {
    maxTypes = currentMax;
  }
}

console.log(maxTypes);
