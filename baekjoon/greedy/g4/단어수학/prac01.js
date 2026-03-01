// 각 문자들의 가중치를 {문자: 가중치} 형태로 구해서, 가중치가 높은 순으로 9~0의 숫자를 곱한 뒤 총합을 구한다.

const { off } = require("cluster");
const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const N = Number(input[0]);

const S = input.slice(1);

function solution(N, S) {
  const costMap = new Map();

  for (let i = 0; i < N; i++) {
    const word = S[i];

    for (let j = 0; j < word.length; j++) {
      costMap.set(
        word[j],
        (costMap.get(word[j]) || 0) + 10 ** (word.length - j - 1),
      );
    }
  }
  const sorted = [...costMap.entries()].sort((a, b) => b[1] - a[1]);

  let sum = 0;
  let position = 9;

  for (let [key, val] of sorted) {
    sum += val * position;
    position--;
  }

  return console.log(sum);
}
solution(N, S);
