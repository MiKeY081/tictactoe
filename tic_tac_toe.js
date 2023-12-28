let cells = document.querySelectorAll(".cell");
let content = document.querySelector(".context");
let restart = document.querySelector(".restart");
let checkboard = ["", "", "", "", "", "", "", "", ""];
let currentplayer = "X";
let numofmoves = 0;
const winningcombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // Only allow moves if the game is still in progress
    if (
      !content.textContent.includes("wins") &&
      !content.textContent.includes("draw")
    ) {
      numofmoves++;
      startGame(index, numofmoves);
    }
  });
});

restart.addEventListener("click", () => {
  clearAll();
  content.textContent = "";
  numofmoves = 0;
  currentplayer = "X";
});

function startGame(index, moves) {
  if (checkboard[index] === "") {
    checkboard[index] = currentplayer;
    document.querySelectorAll(".cell")[index].textContent = currentplayer;
    winCheck(moves);

    if (currentplayer == "X") {
      cells[index].classList.add("X");
    } else {
      cells[index].classList.add("O");
    }

    currentplayer = currentplayer === "X" ? "O" : "X";
  }
}

function winCheck(moves) {
  for (let i = 0; i < winningcombinations.length; i++) {
    const [a, b, c] = winningcombinations[i];
    if (
      checkboard[a] !== "" &&
      checkboard[a] == checkboard[b] &&
      checkboard[c] == checkboard[b]
    ) {
      content.textContent = `${currentplayer} wins!🎉🎉`;
      return; // Exit the function early since the game is won
    }
  }

  if (moves === 9) {
    content.textContent = "It's a draw! Try again.";
    restart.textContent = "Try again"
  }
}

function clearAll() {
  cells.forEach((cell, index) => {
    checkboard[index] = ""; // Clear the checkboard array
    cell.textContent = ""; // Clear the cell content
  });
}
