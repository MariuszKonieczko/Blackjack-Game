import { Card, Types, Weights } from './Card.js';
export class Deck {
  cards = [];

  constructor() {
    Types.forEach((type) => {
      Weights.forEach((weight) => {
        this.cards.push(new Card(weight, type));
      });
    });
  }
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const randomCardNumber = Math.floor(Math.random() * i);
      const tmpCardHandle = this.cards[i];
      this.cards[i] = this.cards[randomCardNumber];
      this.cards[randomCardNumber] = tmpCardHandle;
    }

    return this.cards;
  }

  pickOne() {
    return this.cards.pop();
  }
}
