// Factory Functions

function player(cell) {
  const cellClass = cell;
  return {
    cellClass
  };
}

// Modules

const gameBoard = (function () {
  //   variables

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  let playerTurn; // boolean to switch player
  const board = document.getElementById('board')
  const cellElements = document.querySelectorAll("[data-cell]");

  //   functions  

  function clearBoard() {
    cellElements.forEach((cell) => {
      if (cell.classList.contains("x") || cell.classList.contains("circle")) {
        cell.classList.remove(playerX.cellClass);
        cell.classList.remove(playerCircle.cellClass);
      }
    });
  }

  function setCellFunctions() {
    cellElements.forEach((cell) => {
      // reset cells
      cell.classList.remove(playerX.cellClass);
      cell.classList.remove(playerCircle.cellClass);
      cell.removeEventListener("click", handleClick);

      // enable cell event listener
      cell.addEventListener("click", handleClick, { once: true });
    });
  }

  function swapPlayers() {
    gameBoard.playerTurn = !gameBoard.playerTurn;
  }

  return {
    board,
    WINNING_COMBINATIONS,
    playerTurn,
    cellElements,
    clearBoard,
    swapPlayers,
    setCellFunctions
  };
})();

const displayController = (function () {
  //   Variables
  var gameCompleteScreen = document.getElementById("gameComplete");
  var gameCompleteText = document.querySelector("[game-complete-text]");
  var restartButton = document.getElementById("restartButton");

  restartButton.addEventListener("click", startGame);

  //   Functions
  function setGameCompleteText(text) {
    gameCompleteText.innerHTML = text;
  }

  function showGameCompleteScreen() {
    if (!gameCompleteScreen.classList.contains("show")) {
      gameCompleteScreen.classList.add("show");
    }
  }

  function hideGameCompleteScreen() {
    if (gameCompleteScreen.classList.contains("show")) {
      gameCompleteScreen.classList.remove("show");
    }
  }

  return {
    setGameCompleteText,
    showGameCompleteScreen,
    hideGameCompleteScreen
  };
})();

// Global Variables

const playerX = player("x");
const playerCircle = player("circle");

// Global Functions

function startGame() {
  gameBoard.playerTurn = true;
  gameBoard.clearBoard();
  gameBoard.setCellFunctions();
  setBoardHoverClass();

  displayController.hideGameCompleteScreen();
}

function endGame(draw) {
  
  if (draw) {
    displayController.setGameCompleteText("Draw!");
  } else {
    displayController.setGameCompleteText(`${gameBoard.playerTurn ? "O" : "X"} Wins!`);
  }
  displayController.showGameCompleteScreen();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = gameBoard.playerTurn
    ? playerCircle.cellClass
    : playerX.cellClass;

  //   place mark
  placeMark(cell, currentClass);

  //   check for Win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  //   check for Draw
  else if (isDraw()) {
    endGame(true);
  } else {
    //   Switch Turns/Players
    gameBoard.swapPlayers();
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass){
  cell.classList.add(currentClass);
}

function setBoardHoverClass() {
  // reset board classes
  gameBoard.board.classList.remove(playerX.cellClass);
  gameBoard.board.classList.remove(playerCircle.cellClass);

  /* 
    set board class according 
    to current player class
  */
  if (gameBoard.playerTurn) {
    gameBoard.board.classList.add(playerCircle.cellClass);
  } else {
    gameBoard.board.classList.add(playerX.cellClass);
  }
}

// Checking Win/Draw Conditions

function checkWin(currentClass) {
  return gameBoard.WINNING_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return gameBoard.cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw(){
//   contains array destructuring
  return [...gameBoard.cellElements].every((cell) =>{
    return cell.classList.contains(playerX.cellClass) || 
    cell.classList.contains(playerCircle.cellclass)
  })
}

// Function Calls

startGame();
