const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);
let inputArr = [];

for (let i = 1; i <= N; i++) {
  inputArr.push(input[i].split(" ").map(Number));
}

function solution(arr, n) {
  // 길이가 1일 때
  if (arr.length === 1) return arr[0][0];

  let nextArr = [];

  for (let i = 0; i < n; i += 2) {
    const rowArr = [];
    for (let j = 0; j < n; j += 2) {
      const towBox = [
        arr[i][j],
        arr[i + 1][j],
        arr[i][j + 1],
        arr[i + 1][j + 1],
      ].sort((a, b) => b - a);

      rowArr.push(towBox[1]);
    }
    nextArr.push(rowArr);
  }
  return solution(nextArr, n / 2);
}
console.log(solution(inputArr, N));
