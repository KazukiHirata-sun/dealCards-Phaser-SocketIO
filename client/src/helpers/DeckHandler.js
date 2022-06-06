import CardBack from "./card/CardBack";
import Card from "./card/Card";

export default class DeckHandler {
  constructor (scene) {
    this.dealCard = (x, y, name) => {
      let newCard;
      if (name == "cardBack") {
        newCard = new CardBack(scene);
      } else {
        newCard = new Card(scene, name);
      }
      return(newCard.render(x, y));
    }
  }
}