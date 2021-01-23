import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';
import { Message } from './Message.js';
class Game {
  htmlElements = {
    playersCards: document.getElementById('playersCards'),
    dealersCards: document.getElementById('dealersCards'),
    hitButton: document.getElementById('hit'),
    standButton: document.getElementById('stand'),
    playerPoints: document.getElementById('playerPoints'),
    dealerPoints: document.getElementById('dealerPoints'),
    messageBox: new Message(document.getElementById('message')),
  };
  constructor(player) {
    this.player = player;
    this.dealer = new Player('Croupier');
    this.deck = new Deck();
    this.deck.shuffle();
    this.table = new Table(
      this.htmlElements.playersCards,
      this.htmlElements.dealersCards
    );
  }

  startGame() {
    this.dealCards();
    this.addButtonListener();
  }
  addButtonListener() {
    this.htmlElements.hitButton.addEventListener('click', this.hitCard);
    this.htmlElements.standButton.addEventListener('click', this.dealerPlays);
  }

  hitCard = (e) => {
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.shwowPlayersCard(card);
    this.htmlElements.playerPoints.innerHTML = this.player.calculatePoints();
    if (this.player.points > 21) {
      this.endGame();
    }
  };
  dealCards() {
    for (let i = 0; i < 2; i++) {
      let card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      this.table.shwowPlayersCard(card1);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      this.table.shwowDealersCard(card2);
    }
    this.htmlElements.playerPoints.innerHTML = this.player.calculatePoints();
    this.htmlElements.dealerPoints.innerHTML = this.dealer.calculatePoints();
  }
  dealerPlays = (e) => {
    while (
      this.dealer.points <= this.player.points &&
      this.dealer.points <= 21 &&
      this.player.points <= 21
    ) {
      const card = this.deck.pickOne();
      this.dealer.hand.addCard(card);
      this.table.shwowDealersCard(card);
      this.htmlElements.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }
    this.endGame();
  };
  endGame() {
    this.htmlElements.hitButton.removeEventListener('click', this.hitCard);
    this.htmlElements.standButton.removeEventListener(
      'click',
      this.dealerPlays
    );

    /* this.htmlElements.hitButton.style.display = 'none';
    this.htmlElements.standButton.style.display = 'none'; */

    if (this.player.points < 21 && this.player.points == this.dealer.points) {
      this.htmlElements.messageBox.setText('remis').show();
      return;
    }

    if (this.player.points > 21) {
      this.htmlElements.messageBox.setText('Win croupier').show();
      return;
    }
    if (this.dealer.points > 21) {
      this.htmlElements.messageBox.setText(`Win ${this.player.name}`).show();
      return;
    }
    if (this.player.points < this.dealer.points) {
      this.htmlElements.messageBox.setText('Win croupier').show();
      return;
    }
  }
}

window.onload = function () {
  const player = new Player('Mariusz');
  const game = new Game(player);
  game.startGame();
};
