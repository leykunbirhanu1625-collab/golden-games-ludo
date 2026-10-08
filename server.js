const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Frontend files
app.use(express.static(path.join(__dirname, "frontend")));

let game = {
  players: [
    { id: 1, position: 0 },
    { id: 2, position: 0 }
  ],
  currentPlayer: 1,
  winner: null
};

// Test API
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Golden Games Ludo Backend is running!"
  });
});

// Get game
app.get("/api/game", (req, res) => {
  res.json(game);
});

// Roll dice
app.post("/api/roll", (req, res) => {
  if (game.winner) {
    return res.status(400).json({
      error: "Game is already over"
    });
  }

  const player = game.players.find(
    p => p.id === game.currentPlayer
  );

  const dice = Math.floor(Math.random() * 6) + 1;

  player.position += dice;

  if (player.position >= 30) {
    player.position = 30;
    game.winner = player.id;
  } else {
    game.currentPlayer =
      game.currentPlayer === 1 ? 2 : 1;
  }

  res.json({
    dice,
    game
  });
});

// Reset game
app.post("/api/reset", (req, res) => {
  game = {
    players: [
      { id: 1, position: 0 },
      { id: 2, position: 0 }
    ],
    currentPlayer: 1,
    winner: null
  };

  res.json(game);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});