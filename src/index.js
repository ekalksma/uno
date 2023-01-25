import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Card(props) {
  return (
    <button className="card" style={{backgroundColor: props.color}}>
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
    this.setTopcard();
    this.drawCards(7);
 }

  setTopcard() {
    this.setState({
      topcard: this.state.deck[0]
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

  handleClick(i) {
  }

  createDeck() {
    let deck = [];
    const colors = ['red','blue','green','yellow'];

    colors.forEach(color => {
      for (let i = 0; i < 10; i++) {
        deck.push({
          color: color,
          number: i,
       })
      }  
    })

    return deck.sort(() => Math.random() - 0.5);
  }

  render() {
    const player = this.state.player;
    const playerCards = player.map(card => {
      return (
        <Card 
          color={card.color}
          number={card.number}
        />
      )
    })

    return (
      <div className="game">
        <div className="topcard">
          <Card
            color={this.state.topcard.color}
            number={this.state.topcard.number}
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