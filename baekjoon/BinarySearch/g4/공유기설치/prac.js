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

let start = 1;
let end = houses[houses.length - 1] - houses[0];
let result = 0;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  const routeCount = countRouters(mid);

  if (routeCount >= C) {
    result = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}
console.log(result);

function countRouters(dis) {
  let count = 1;
  let curIdx = 0;

  for (let i = 1; i < houses.length; i++) {
    if (houses[i] - houses[curIdx] < dis) continue;
    else {
      count++;
      curIdx = i;
    }
  }
  return count;
}
