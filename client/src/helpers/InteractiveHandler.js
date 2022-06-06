export default class InteractiveHandler {
  constructor(scene){

    scene.cardPreview = null;
    
    scene.dealCards.on('pointerdown', () => {
      scene.socket.emit("dealCards", scene.socket.id);
      scene.dealCards.disableInteractive();
    })
    
    scene.dealCards.on('pointerover', () => {
      scene.dealCards.setColor('#F5DF99');
    })

    scene.dealCards.on('pointerout', () => {
      scene.dealCards.setColor('#F2FBF9')
    })
  }
}