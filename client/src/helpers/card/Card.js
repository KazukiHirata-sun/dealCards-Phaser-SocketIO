export default class Card {
  constructor(scene, name) {
      this.render = (x, y) => {
          let sprite = name
          let card = scene.add.image(x, y, 'cards', sprite).setScale(1, 1).setInteractive();
          return card;
      }
  }
}