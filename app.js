// * empty board is generated from array of empty strings
// * default to being user's turn
// * user chooses a cell position to make a move
// * if user's turn, marker is "X", otherwise "O"
// * determine the index of that selected cell
// * insert marker at that specific index of the array
// * rerender board after marker is placed into array
// * becomes cpu's turn
// randomly insert "O" marker
// becomes user's turn
// check for 3 in a row
// if 3 in a row exist, declare winner
// if board is filled without 3 in a row, game is a draw
// restart game

const gameModule = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  let isUserTurn = true;

  const getBoard = () => board;

  const getMarker = () => (isUserTurn ? "X" : "O");

  const makeMove = (index) => {
    board[index] = getMarker();
    isUserTurn = !isUserTurn;
  };

  return {
    getBoard,
    getMarker,
    makeMove,
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
      handleUserMove(cell, index);
    });
  });
};

const handleUserMove = (cell, index) => {
  if (cell.textContent) return;

  cell.textContent = gameModule.getMarker();
  gameModule.makeMove(index);
};

window.addEventListener("load", createBoard);
