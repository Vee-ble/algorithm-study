const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let ans = [];

const T = input[0];
let cursor = 1;

for (let i = 0; i < T; i++) {
  const p = input[cursor]; // 명령 함수
  const n = Number(input[cursor + 1]); // 요소의 개수
  const arrString = input[cursor + 2]; // 문자열로 된 배열

  let nums = [];
  if (n > 0) {
    // JSON.parse로 파싱
    nums = JSON.parse(arrString);
  }

  let isReversed = false;
  let isError = false;

  let head = 0;
  let tail = n - 1;

  // 명령 함수의 개수만큼 반복
  for (let j = 0; j < p.length; j++) {
    const cmd = p[j];

    if (cmd === "R") {
      isReversed = !isReversed;
    } else if (cmd === "D") {
      if (head > tail) {
        isError = true;
        break;
      }

      if (isReversed) {
        tail--;
      } else {
        head++;
      }
    }
  }

  if (isError) {
    ans.push("error");
  } else {
    const result = nums.slice(head, tail + 1);

    if (isReversed) {
      result.reverse();
    }

    // 출력 포맷 정리
    ans.push(JSON.stringify(result));
  }
  cursor += 3;
}

console.log(ans.join("\n"));
