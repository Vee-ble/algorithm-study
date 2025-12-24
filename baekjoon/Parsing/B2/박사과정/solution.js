const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

function solution() {
  // 입력 파싱
  // const N = Number(input[0]);
  // 로직
  // console.log(answer);
}
solution(N, input);
