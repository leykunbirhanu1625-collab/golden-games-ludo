const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const board = document.getElementById("board");
const dice = document.getElementById("dice");
const rollButton = document.getElementById("rollButton");
const status = document.getElementById("status");
const turnElement = document.getElementById("turn");

const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");

let currentPlayer = 1;
let positions = [0, 0];
let gameOver = false;

for (let i = 0; i < 49; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";

  if (i % 7 === 3 || Math.floor(i / 7) === 3) {
    cell.classList.add("path");
  }

  board.appendChild(cell);
}

function renderBoard() {
  document.querySelectorAll(".token").forEach(token => token.remove());

  const players = [
    { position: positions[0], color: "#ef4444" },
    { position: positions[1], color: "#3b82f6" }
  ];

  players.forEach(player => {
    if (player.position >= 49) return;

    const cell = board.children[player.position];
    if (!cell) return;

    const token = document.createElement("div");
    token.className = "token";
    token.style.background = player.color;

    cell.appendChild(token);
  });

  player1Score.textContent = positions[0];
  player2Score.textContent = positions[1];
}

rollButton.addEventListener("click", () => {
  if (gameOver) return;

  const number = Math.floor(Math.random() * 6) + 1;

  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  dice.textContent = diceFaces[number - 1];

  positions[currentPlayer - 1] += number;

  renderBoard();

  if (positions[currentPlayer - 1] >= 30) {
    status.textContent = `🏆 Player ${currentPlayer} wins!`;
    gameOver = true;
    rollButton.disabled = true;
    return;
  }

  status.textContent = `Rolled ${number}`;

  currentPlayer = currentPlayer === 1 ? 2 : 1;

  turnElement.textContent = `Player ${currentPlayer}`;
});

renderBoard();