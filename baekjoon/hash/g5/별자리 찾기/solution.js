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
