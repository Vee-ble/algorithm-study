const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const m = Number(input[0]);

const aStars = [];

// 1. 찾고자 하는 별자리를 입력 A
for (let i = 1; i <= m; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  aStars.push({ x, y });
}

const nIndex = m + 1;
const n = Number(input[nIndex]);

// stars 변수 - 모든 별들 좌표 B
const bStars = [];

// skySet 변수 - 모든 별들 좌표를 문자열 형태로 저장하여, 모든 A 좌표들에 평행 이동한 값이 있다면 평행 이동 값을 반환해준다.
const skySet = new Set();

// 2. stars와 skySet에 데이터를 넣는다. n개 B

for (let i = nIndex + 1; i <= nIndex + n; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  bStars.push({ x, y });
  skySet.add(`${x},${y}`);
}

const firstStar = aStars[0];

// 3. B를 loop하여 평행이동 거리를 탐색한다.

for (let i = 0; i < n; i++) {
  const curSkyStar = bStars[i];

  const dx = curSkyStar.x - firstStar.x;
  const dy = curSkyStar.y - firstStar.y;

  let isMathch = true;

  for (let j = 1; j < m; j++) {
    const cx = aStars[j].x + dx;
    const cy = aStars[j].y + dy;

    if (!skySet.has(cx + "," + cy)) {
      isMathch = false;
      break;
    }
  }
  if (isMathch) {
    console.log(`${dx} ${dy}`);
    return;
  }
}
// constell
