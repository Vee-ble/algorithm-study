const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

let cursor = 0;
const N = Number(input[cursor++]);
const NArr = input[cursor++].split(" ").map(Number);
const M = Number(input[cursor++]);
const MArr = input[cursor++].split(" ").map(Number);

function solution(NArr, MArr) {
  const results = [];

  NArr.sort((a, b) => a - b);

  for (const num of MArr) {
    results.push(binarySearch(NArr, num));
  }

  console.log(results.join(" "));
}

function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      return 1;
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return 0;
}

solution(NArr, MArr);
