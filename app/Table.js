export class Table {
  constructor(playersCards, dealersCards) {
    this.playersCards = playersCards;
    this.dealersCards = dealersCards;
  }

  shwowPlayersCard(card) {
    this.playersCards.appendChild(card.render());
  }
  shwowDealersCard(card) {
    this.dealersCards.appendChild(card.render());
  }
}
