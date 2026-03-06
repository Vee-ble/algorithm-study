const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = Number(input[0]);
let cursor = 1;

for (let i = 0; i < T; i++) {
  const [N, M] = input[cursor++].split(" ");
  const A = input[cursor++].split(" ").map(Number);
  const B = input[cursor++].split(" ").map(Number);

  B.sort((a, b) => a - b);

  let result = 0;

  for (let j = 0; j < A.length - 1; j++) {
    const idx = binarySearch(A[j], B);
    if (idx === Infinity) continue;
    result += B.length - idx;
  }
}
console.log(result);

function binarySearch(target, Arr) {
  let start = 0;
  let end = Arr.length - 1;
  let idx = Infinity;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (Arr[mid] >= target) {
      idx = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return idx;
}
