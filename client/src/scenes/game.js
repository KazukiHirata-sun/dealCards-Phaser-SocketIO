import UIHandler from "../helpers/UIHandler";
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import GameHandler from "../helpers/GameHandler";
import SocketHandler from "../helpers/SocketHandler";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'Game'
    })
  }

  preload() {
    this.load.atlas('cards', 'src/assets/atlas/cards.png', 'src/assets/atlas/cards.json');
    this.load.image('card-back', 'src/assets/back.png');
  }

  create() {
    this.DeckHandler = new DeckHandler(this);
    this.GameHandler = new GameHandler(this);
    this.SocketHandler = new SocketHandler(this);
    this.UIHandler = new UIHandler(this);
    this.UIHandler.buildUI();
    this.InteractiveHandler = new InteractiveHandler(this);
  }

  update() {

  }
}