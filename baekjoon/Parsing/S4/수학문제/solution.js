const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]); // 첫 줄 개수
const data = input.slice(1); // 나머지 데이터

solution(data);
function solution(list) {
  let slow = 0,
    fast = 0;
  const numbers = [];

  for (let i = 0; i < N; i++) {
    (slow = 0), (fast = 0);
    const string = list[i];
    for (let j = 0; j < string.length; j++) {
      fast++;
      const slowToNum = Number(string[slow]);
      const fastToNum = Number(string[fast]);

      const slowIsNum = slowToNum >= 0 && slowToNum <= 9;
      const fastIsNum = fastToNum >= 0 && fastToNum <= 9;

      if (!slowIsNum && !fastIsNum) continue;
      else if (!slowIsNum && fastIsNum) slow = fast;
      else if (slowIsNum && !fastIsNum) {
        numbers.push(BigInt(string.slice(slow, fast)));
        slow = fast;
      }
    }
  }
  numbers.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  console.log(numbers.join("\n"));
}
