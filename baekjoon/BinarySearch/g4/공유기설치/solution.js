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

let left = 1;
let right = houses[houses.length - 1] - houses[0];
let result = 0;

while (right >= left) {
  let mid = Math.floor((right + left) / 2);

  const countRoute = countRouters(mid);

  if (countRoute >= C) {
    result = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(result);

function countRouters(mid) {
  let count = 1;
  let curIndex = 0;

  for (let i = 1; i < houses.length; i++) {
    if (houses[i] - houses[curIndex] < mid) continue;

    count++;
    curIndex = i;
  }
  return count;
}
