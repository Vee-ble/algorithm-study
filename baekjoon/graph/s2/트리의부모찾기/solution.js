const fs = require("fs");
const path = require("path");

const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "input.txt");

const input = fs.readFileSync(filePath).toString().trim().split(/\r?\n/);

const n = parseInt(input[0]);
const adj = Array.from({ length: n + 1 }, () => []);

// u v 형태로 연결을 표현한 문자열을 [u, v]형태로 만들어
// adj에 추가한다. index는 정점, 값은 배열 형태의 연결된 정점들이 들어있다.
for (let i = 1; i < n; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

// 해당 인덱스의 부모를 저장하는 변수
const parent = new Array(n + 1).fill(0);

// 1자리엔 루트인 1이 들어간다.
const queue = [1];
parent[1] = 1;

let head = 0;
while (head < queue.length) {
  const cur = queue[head++];

  // 연결된 이웃 노드들을 확인한다.
  for (const next of adj[cur]) {
    // 해당 자식의 부모 값이 0이라면
    if (parent[next] === 0) {
      // 부모 값을 업데이트 한다.
      parent[next] = cur;
      // 자식 값들 큐에 넣는다.
      queue.push(next);
    }
  }
}

let result = "";
for (let i = 2; i <= n; i++) {
  result += parent[i] + "\n";
}
console.log(result);
