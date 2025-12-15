function solution(n) {
  const twoDimArr = Array.from({ length: n }, (_, i) => Array(i + 1).fill(0));
  let filling = 1;
  let directions = [
    [1, 0],
    [0, 1],
    [-1, -1],
  ];
  let curDirection = 0;
  let curPosition = [-1, 0];
  while (filling <= (n * (n + 1)) / 2) {
    const nr = curPosition[0] + directions[curDirection % 3][0];
    const nc = curPosition[1] + directions[curDirection % 3][1];

    if (twoDimArr[nr]?.[nc] === undefined || twoDimArr[nr]?.[nc] !== 0) {
      curDirection++;
      continue;
    } else {
      curPosition[0] = nr;
      curPosition[1] = nc;
      twoDimArr[nr][nc] = filling;
      filling++;
    }
  }
  return twoDimArr.flat();
}

console.log(solution(4));
