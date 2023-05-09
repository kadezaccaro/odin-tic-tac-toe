const gameModule = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  let isUserTurn = true;
  const winningCombinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left to bottom-right
    [2, 4, 6], // diagonal from top-right to bottom-left
  ];

  const drawMsg = document.querySelector(".draw-msg");
  const restartBtn = document.querySelector(".restart-btn");

  const getBoard = () => board;
  const getIsUserTurn = () => isUserTurn;
  const isBoardFull = () => (board.includes("") ? false : true);
  const getCurrentMarker = () => (isUserTurn ? "X" : "O");
  const isMoveValid = (index) => board[index] === "";
  const switchTurns = () => (isUserTurn = !isUserTurn);

  const makeMove = (index) => {
    if (!isMoveValid(index)) return;

    board[index] = getCurrentMarker();
    updateBoard();

    if (checkGameEnd()) return;

    switchTurns();
    handleCPUMove();
  };

  const updateBoard = () => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
      cell.textContent = board[index];

      if (board[index] === "O") {
        cell.classList.add("cpu-marker-color");
      }
    });
  };

  const handleCPUMove = () => {
    setTimeout(() => {
      let randomNum;
      do {
        randomNum = Math.floor(Math.random() * board.length);
      } while (board[randomNum] !== "");

      board[randomNum] = getCurrentMarker();

      updateBoard();

      if (checkGameEnd()) return;

      switchTurns();
    }, 500);
  };

  const checkGameEnd = () => {
    if (isBoardFull() || checkWinner()) {
      restartBtn.classList.remove("hide-btn");

      if (isBoardFull() && !checkWinner()) {
        drawMsg.classList.remove("hide-draw-msg");
      }

      return true;
    }

    return false;
  };

  const checkWinner = () => {
    const marker = getCurrentMarker();
    const cells = document.querySelectorAll(".cell");

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === marker && board[b] === marker && board[c] === marker) {
        // add classes to animate the winning combination
        cells[a].classList.add("winning-cell");
        cells[b].classList.add("winning-cell");
        cells[c].classList.add("winning-cell");

        return true;
      }
    }

    return false;
  };

  const resetGame = () => {
    const gameContainer = document.querySelector(".game-container");
    restartBtn.classList.add("hide-btn");
    drawMsg.classList.add("hide-draw-msg");
    board.fill("");
    gameContainer.innerHTML = "";
    createBoard();
    isUserTurn = true;
  };

  restartBtn.addEventListener("click", resetGame);

  return {
    getBoard,
    getIsUserTurn,
    makeMove,
    updateBoard,
    checkWinner,
  };
})();

const createBoard = () => {
  const gameContainer = document.querySelector(".game-container");
  const board = gameModule.getBoard();

  board.forEach((cellValue, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameContainer.appendChild(cell);

    cell.addEventListener("click", () => {
      handleCellClick(index);
    });
  });

  gameModule.updateBoard();
};

const handleCellClick = (index) => {
  if (gameModule.getIsUserTurn() && !gameModule.checkWinner()) {
    gameModule.makeMove(index);
  }
};

window.addEventListener("load", createBoard);
