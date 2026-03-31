const fs = require("fs");
const input = fs.readFileSync(0, "utf8").split("\n");

function solve() {
  const speciesMap = new Map();
  let totalCount = 0;

  for (const tree of input) {
    if (tree === "") continue;
    speciesMap.set(tree, (speciesMap.get(tree) || 0) + 1);
    totalCount++;
  }
  const sortedKeys = Array.from(speciesMap.keys()).sort();

  const output = [];
  for (const tree of sortedKeys) {
    const count = speciesMap.get(tree);
    const percentage = ((count / totalCount) * 100).toFixed(4);
    output.push(`${tree} ${percentage}`); // 배열에 추가
  }

  console.log(output.join("\n"));
}
solve();
