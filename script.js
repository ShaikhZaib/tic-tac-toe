console.log("Tic-Tac-Toe");

function Player(name, marker) {
  return { name, marker };
}

const GameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return [...board];
  }

  function placeMarker(index, marker) {
    if (board[index] !== "") return false;

    board[index] = marker;
    return true;
  }

  function resetBoard() {
    board.fill("");
  }

  return {
    getBoard,
    placeMarker,
    resetBoard,
  };
})();

const GameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");

  let currentPlayer = player1;
  let gameOver = false;
  let winner = null;

  function playRound(index) {
    if (gameOver) return;

    if (!GameBoard.placeMarker(index, currentPlayer.marker)) return;

    if (checkWinner()) {
      gameOver = true;
      winner = currentPlayer;
      return;
    }

    if (checkDraw()) {
      gameOver = true;
      return;
    }

    switchPlayer();
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function checkWinner() {
    const board = GameBoard.getBoard();

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [first, second, third] = combination;

      if (
        board[first] !== "" &&
        board[first] === board[second] &&
        board[first] === board[third]
      ) {
        return true;
      }
    }

    return false;
  }

  function checkDraw() {
    const board = GameBoard.getBoard();

    return !board.includes("");
  }

  function restartGame() {
    GameBoard.resetBoard();

    gameOver = false;
    winner = null;
    currentPlayer = player1;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function getWinner() {
    return winner;
  }

  function isGameOver() {
    return gameOver;
  }

  return {
    playRound,
    restartGame,
    getCurrentPlayer,
    getWinner,
    isGameOver,
  };
})();
