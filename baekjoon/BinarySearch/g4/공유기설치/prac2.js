const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);
const [N, C] = input[0].split(" ").map(Number);
const houses = input.slice(1).map(Number);

houses.sort((a, b) => a - b);

let l = 1;
let r = houses[houses.length - 1] - houses[0];

while (l <= r) {
  const mid = Math.floor((l + r) / 2);

  let count = 1;
  let last = houses[0];
  let isPossible = false;

  for (let i = 1; i < N; i++) {
    // 현재 집과 마지막 설치 지점의 거리가 mid 이상이면
    if (houses[i] - last >= mid) {
      // 설치하고 위치 갱신
      count++;
      last = houses[i];
    }

    if (count >= C) {
      isPossible = true;
      break;
    }
  }
  if (isPossible) {
    l = mid + 1;
  } else r = mid - 1;
}

console.log(r);
