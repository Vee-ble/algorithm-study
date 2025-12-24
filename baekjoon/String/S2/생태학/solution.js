const fs = require("fs");
const input = fs.readFileSync(0, "utf8").split("\n");

const speciesMap = new Map();
let totalCount = 0;

for (const tree of input) {
  if (tree === "") continue;
  speciesMap.set(tree, (speciesMap.get(tree) || 0) + 1);
  totalCount++;
}

const results = [];
[...speciesMap.keys()].sort().forEach((tree) => {
  const percentage = ((speciesMap.get(tree) / totalCount) * 100).toFixed(4);
  results.push(`${tree} ${percentage}`);
});

console.log(results.join("\n"));
