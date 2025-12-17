function solution(m, n, board) {
  board = board.map((row) => row.split(""));
  let deletedCount = 0;

  while (true) {
    const deleteSet = new Set();
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        const val = board[i][j];
        if (!val) continue;
        if (
          val === board[i][j + 1] &&
          val === board[i + 1][j] &&
          val === board[i + 1][j + 1]
        ) {
          deleteSet.add(`${i},${j}`);
          deleteSet.add(`${i},${j + 1}`);
          deleteSet.add(`${i + 1},${j}`);
          deleteSet.add(`${i + 1},${j + 1}`);
        }
      }
    }
    if (!deleteSet.size) break;

    deletedCount += deleteSet.size;
    deleteSet.forEach((e) => {
      const [rowI, colI] = e.split(",");
      board[rowI][colI] = "";
    });

    for (let j = 0; j < n; j++) {
      const tempStack = [];
      for (let i = 0; i < m; i++) {
        if (board[i][j]) tempStack.push(board[i][j]);
      }

      for (let k = m - 1; k >= 0; k--) {
        board[k][j] = tempStack.pop() ?? "";
      }
    }
  }
  return deletedCount;
}
