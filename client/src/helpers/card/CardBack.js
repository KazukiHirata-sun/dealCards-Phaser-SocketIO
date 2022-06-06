export default class CardBack {
  constructor(scene) {
    this.render = (x, y) => {
        let card = scene.add.image(x, y, "card-back").setScale(0.8, 0.8).setInteractive();
        return card;
    }
  }
}