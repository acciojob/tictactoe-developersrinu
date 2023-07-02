//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function() {
  const player1 = document.getElementById("player-1").value;
  const player2 = document.getElementById("player-2").value;

  if (player1.trim() === "" || player2.trim() === "") {
    alert("Please enter names for both players");
    return;
  }

  document.getElementById("input-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  document.querySelector(".message").textContent = `${player1}, you're up!`;
});

const cells = document.getElementsByClassName("cell");
let currentPlayer = "player-1";

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function() {
    if (cells[i].textContent === "") {
      cells[i].textContent = currentPlayer === "player-1" ? "X" : "O";
      cells[i].classList.add(currentPlayer);
      checkWin(currentPlayer);
      currentPlayer = currentPlayer === "player-1" ? "player-2" : "player-1";
      const nextPlayer = currentPlayer === "player-1" ? document.getElementById("player-1").value : document.getElementById("player-2").value;
      document.querySelector(".message").textContent = `${nextPlayer}, you're up!`;
    }
  });
}

function checkWin(player) {
  const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7]              // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a-1].classList.contains(player) && cells[b-1].classList.contains(player) && cells[c-1].classList.contains(player)) {
      const playerName = player === "player-1" ? document.getElementById("player-1").value : document.getElementById("player-2").value;
      document.querySelector(".message").textContent = `${playerName}, congratulations! You won!`;
      disableCells();
      return;
    }
  }
}

function disableCells() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", null);
  }
}
