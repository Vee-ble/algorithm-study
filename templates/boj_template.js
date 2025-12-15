const fs = require("fs");
// 로컬에선 input.txt, 백준에선 /dev/stdin 사용
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  // 입력 파싱
  // const N = Number(input[0]);
  // 로직
  // console.log(answer);
}
solution();
