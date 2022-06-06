export default class UIHandler {
  constructor(scene) {

    this.buildPlayerAreas = () => {

      scene.deckArea = scene.add.rectangle(1000, 445, 155, 215)

      scene.playerHandArea = scene.add.rectangle(470, 845, 850, 260);
      scene.playerHandArea.setStrokeStyle(4, 0xF6FBF4);
    
      scene.opponentHandArea = scene.add.rectangle(470, 150, 850, 260);
      scene.opponentHandArea.setStrokeStyle(4, 0xF6FBF4);
    }

    this.buildGameText = () => {
    
      scene.dealCards = scene.add.text(445, 445, "ゲームスタート").setFontSize(36).setFontFamily('Trebuchet MS');
    }
    this.buildUI = () => {
      this.buildGameText();
      this.buildPlayerAreas();
    }

  }
}