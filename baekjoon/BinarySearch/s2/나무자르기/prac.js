const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);

const trees = input[1].split(" ").map(Number);

let start = 0;
let end = maxHeight(trees);
let result = 0;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let sum = 0;

  for (const tree of trees) {
    if (tree > mid) {
      sum += tree - mid;
    }
  }
  if (sum < M) {
    end = mid - 1;
  } else {
    result = mid;
    start = mid + 1;
  }
}
console.log(result);

function maxHeight(arr) {
  let max = 0;

  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }

  return max;
}
