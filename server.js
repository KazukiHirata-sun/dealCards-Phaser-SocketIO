const server = require('express')();
const http = require('http').createServer(server);
const cors = require('cors');
const shuffle = require('shuffle-array');

let gameState = "Initializing";
let players = {};
let readyCheck = 0;

const cards = [
  "clubs2",
  "clubs3",
  "clubs4",
  "clubs5",
  "clubs6",
  "clubs7",
  "clubs8",
  "clubs9",
  "clubsKing",
  "clubsJack",
  "clubsQueen",
  "clubsAce",
  "diamonds2",
  "diamonds3",
  "diamonds4",
  "diamonds5",
  "diamonds6",
  "diamonds7",
  "diamonds8",
  "diamonds9",
  "diamondsKing",
  "diamondsJack",
  "diamondsQueen",
  "diamondsAce",
  "hearts2",
  "hearts3",
  "hearts4",
  "hearts5",
  "hearts6",
  "hearts7",
  "hearts8",
  "hearts9",
  "heartsKing",
  "heartsJack",
  "heartsQueen",
  "heartsAce",
  "spades2",
  "spades3",
  "spades4",
  "spades5",
  "spades6",
  "spades7",
  "spades8",
  "spades9",
  "spadesKing",
  "spadesJack",
  "spadesQueen",
  "spadesAce",
]

const io = require("socket.io")(http, {
  cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"]
  }
});

io.on('connection', function (socket) {
  console.log('A user connected: ' + socket.id);

  players[socket.id] = {
      inDeck: [],
      inHand: [],
      isPlayerA: false
  };

  if (Object.keys(players).length < 2) {
      players[socket.id].isPlayerA = true;
      io.emit('firstTurn');
  }

  socket.on('dealDeck', function (socketId) {
      players[socketId].inDeck = shuffle(cards);
      console.log(players);
      if (Object.keys(players).length < 2) return;
      io.emit('changeGameState', "Initializing");
  })

  socket.on('dealCards', function (socketId) {
      for (let i = 0; i < 2; i++) {
          if (players[socketId].inDeck.length === 0) {
              players[socketId].inDeck = shuffle(cards);
          }
          players[socketId].inHand.push(players[socketId].inDeck.shift());
      }
      console.log(players);
      io.emit('dealCards', socketId, players[socketId].inHand);
      readyCheck++;
      if (readyCheck >= 2) {
          gameState = "Ready";
          io.emit('changeGameState', "Ready");
      }
  });

  socket.on('disconnect', function () {
      console.log('A user disconnected: ' + socket.id);
      delete players[socket.id];
  });
});

http.listen(3000, function() {
  console.log("server started")
})
