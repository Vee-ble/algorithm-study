const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const T = Number(input[0]);

for (let i = 1; i <= T; i++) {
  const string = input[i];

  const { isPal, count } = isPalindrome(string);
  console.log(`${isPal} ${count}`);
}

function recursion(s, l, r, c) {
  if (l >= r) return { isPal: 1, count: c };
  else if (s[l] !== s[r]) return { isPal: 0, count: c };
  else return recursion(s, l + 1, r - 1, c + 1);
}

function isPalindrome(s) {
  let count = 1;
  return recursion(s, 0, s.length - 1, count);
}
