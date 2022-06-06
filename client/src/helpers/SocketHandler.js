import io from 'socket.io-client';

export default class SocketHandler {
  constructor(scene){
    scene.socket = io('http://localhost:3000');

    scene.socket.on('connect', () => {
      console.log('Connected!');
      scene.socket.emit('dealDeck', scene.socket.id);
    });

    scene.socket.on('firstTurn', () => {
        scene.GameHandler.changeTurn();
    })

    scene.socket.on('changeGameState', (gameState) => {
        scene.GameHandler.changeGameState(gameState);
        if (gameState === "Initializing") {
            scene.DeckHandler.dealCard(1000, 445, "cardBack");
            scene.dealCards.setInteractive();
            scene.dealCards.setColor('#F2FBF9');
        }
    });

    scene.socket.on('changeTurn', () => {
        scene.GameHandler.changeTurn();
    })


    scene.socket.on('dealCards', (socketId, cards) => {
        if (socketId === scene.socket.id) {
            for (let i in cards) {
                let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(300 + (i * 150), 850, cards[i]));
            }
        } else {
            for (let i in cards) {
              if (i == 0) {
                let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(300 + (i * 150), 150, "cardBack"));
              } else {
                let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(300 + (i * 150), 150, cards[i]));
              }
            }
        }
    })

  }
}