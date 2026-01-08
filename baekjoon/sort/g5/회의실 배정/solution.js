const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const buffer = fs.readFileSync(filePath);
let bufferIdx = 0;
let bufferLen = buffer.length;

function readInt() {
  let result = 0;
  while (bufferIdx < bufferLen && buffer[bufferIdx] <= 32) bufferIdx++;

  while (bufferIdx < bufferLen && buffer[bufferIdx] >= 48) {
    result = result * 10 + (buffer[bufferIdx++] - 48);
  }
  return result;
}

const N = readInt();
const ev = new Uint32Array(N * 2);

for (let i = 0; i < N * 2; i++) {
  ev[i] = readInt();
}

new BigUint64Array(ev.buffer).sort();
console.log(ev);

let end = 0;
let max = 0;

for (let i = 0; i < N * 2; i += 2) {
  // ev[i]: Start Time, ev[i+1]: End Time
  if (ev[i] >= end) {
    end = ev[i + 1];
    max++;
  }
}
fs.writeSync(1, max.toString());
