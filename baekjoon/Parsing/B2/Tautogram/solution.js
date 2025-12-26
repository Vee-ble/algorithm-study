const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

for (let i = 0; i < input.length - 1; i++) {
  const line = input[i].trim();

  if (line === "*") break;
  if (line === "") continue;

  const sentence = input[i].split(" ");
  const firstChar = sentence[0][0].toLowerCase();
  let status = true;

  for (let j = 1; j < sentence.length; j++) {
    const curChar = sentence[j][0].toLowerCase();
    if (firstChar !== curChar) {
      status = false;
      break;
    }
  }
  console.log(status ? "Y" : "N");
}
