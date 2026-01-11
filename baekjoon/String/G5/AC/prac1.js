const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let cursor = 0;

const T = input[cursor++]; // 1

for (let i = 0; i < T; i++) {
  const func = input[cursor++]; // 2
  const p = Number(input[cursor++]); // 3
  const arr = input[cursor++]; // 4

  const nums = JSON.parse(arr);

  let startPt = 0;
  let endPt = p - 1;
  let isReversed = false;
  let isError = false; // 에러 상태 플래그

  for (let j = 0; j < func.length; j++) {
    const f = func[j];

    if (f === "R") {
      isReversed = !isReversed;
    }

    if (f === "D") {
      if (startPt > endPt) {
        isError = true;
        break; // 루프 탈출
      }
      if (isReversed) {
        endPt--;
      }

      if (!isReversed) {
        startPt++;
      }
    }
  }
  if (isError) {
    console.log("error");
  } else {
    const result = nums.slice(startPt, endPt + 1);
    if (isReversed) {
      result.reverse();
    }

    console.log(JSON.stringify(result));
  }
}
