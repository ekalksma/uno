import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Card(props) {
  return (
    <button className="card" 
      style={{backgroundColor: props.color}}
      onClick={() => props.onClick({color: props.color, number: props.number})}
    >
      {props.number}
    </button>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: this.createDeck(),
      topcard: {number: 0, color: 'red'},
      player: [],
    };

  }

  componentDidMount() {
    this.shuffleDeck();
    this.setTopcard();
    this.drawCards(7);
 }

  setTopcard() {
    let deck = this.state.deck;
    let topcard = deck.pop()

    this.setState({
      deck: deck,
      topcard: topcard
    })
  }

  drawCards(numberOfCards) {
    let deck = this.state.deck;
    let playerCards = this.state.player;

    for(let i = 0; i < numberOfCards; i++) {
      playerCards.push(deck.pop());
    }

    this.setState({
      deck: deck,
      player: playerCards,
    })
  }

  handleClick(selectedCard) {
    let playerCards = this.state.player;

    const index = playerCards.findIndex(object => {
      return object.color === selectedCard.color && object.number === selectedCard.number;
    });

    playerCards.splice(index, 1);

    this.setState({
      player: playerCards,
      topcard: selectedCard,
    })
  }

  shuffleDeck() {
    let deck = this.state.deck;
    deck.sort(() => Math.random() - 0.5);

    this.setState({
      deck: deck,
    })
  }

  createDeck() {
    let deck = [];
    const colors = ['red','blue','chartreuse','gold'];

    colors.forEach(color => {
      for (let i = 0; i < 10; i++) {
        deck.push({
          color: color,
          number: i,
       })
      }  
    })

    return deck;
  }

  render() {
    const player = this.state.player;
    const playerCards = player.map(card => {
      return (
        <Card 
          color={card.color}
          number={card.number}
          onClick={(card) => this.handleClick(card)}
        />
      )
    })

    return (
      <div className="game">
        <div className="topcard">
          <Card
            color={this.state.topcard.color}
            number={this.state.topcard.number}
            onClick={() => console.log("Nice Try")}
          />
        </div>
        <div className="player-cards">
          {playerCards}
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);