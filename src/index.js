import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Card(props) {
  if (props.number === 11) {
    return (
      <button className="card" 
        style={{backgroundColor: props.color}}
        onClick={() => props.onClick({color: props.color, number: props.number})}
      >
        +2
      </button>
    );
  }

  if (props.number === 13) {
    return (
      <button className="card skip" 
        style={{backgroundColor: props.color}}
        onClick={() => props.onClick({color: props.color, number: props.number})}
      >
        🛇
      </button>
    );
  }

  if (props.number === 14) {
    return (
      <button className="card select-color"
        style={{backgroundColor: "black"}}
        onClick={() => props.onClick({color: props.color, number: props.number})}
      >
        
      </button>
    );
  }

  if (props.number === 15) {
    return (
      <button className="card plus-four"
        style={{backgroundColor: "black"}}
        onClick={() => props.onClick({color: props.color, number: props.number})}
      >
        +4
      </button>
    );
  }

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
      players: [[],[]],
    };

  }

  componentDidMount() {
    this.shuffleDeck();
    this.setTopcard();
    this.drawCards(0,7);
    this.drawCards(1,7)
 }

  setTopcard() {
    let deck = this.state.deck;
    let topcard = deck.pop()

    this.setState({
      deck: deck,
      topcard: topcard
    })
  }

  drawCards(playerIndex, numberOfCards) {
    let deck = this.state.deck;
    let players = this.state.players;

    for(let i = 0; i < numberOfCards; i++) {
      players[playerIndex].push(deck.pop());
    }

    this.setState({
      deck: deck,
      players: players,
    })
  }

  handleClick(selectedCard) {
    let players = this.state.players;
    let topcard = this.state.topcard;
    const playerIndex = 0;

    if (this.getAvailableMoves(topcard, 0).includes(selectedCard)){
      const index = this.getCardIndex(selectedCard, playerIndex)
  
      players[playerIndex].splice(index, 1);
  
      this.setState({
        players: players,
        topcard: selectedCard,
      },() => {
        this.handleAI();
      });
    }
  }

  getCardIndex(card, playerIndex) {
    return this.state.players[playerIndex].findIndex(object => {
      return object.color === card.color && object.number === card.number;
    });
  }

  handleAI() {
    let players = this.state.players;
    const indexAI = 1;
    const moves = this.getAvailableMoves(this.state.topcard, 1);
    console.log(moves);
    if (moves.length > 0 ){
      const randomIndex = Math.floor(Math.random() * moves.length);
      const selectedCard = moves[randomIndex];
      const cardIndex = this.getCardIndex(selectedCard, indexAI)
      players[indexAI].splice(cardIndex,1);
      
      this.setState({
        players: players,
        topcard: moves[randomIndex],
      })
    }
  }

  getAvailableMoves(topcard, playerIndex) {
    let availableMoves = [];
    const cards = this.state.players[playerIndex];
    cards.forEach( card => {
      if (card.number === topcard.number || card.color === topcard.color) {
        availableMoves.push(card)
      }
    });
    return availableMoves;
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
      deck.push({
        color: color,
        number: 0,
      });

      for (let i = 1; i < 10; i++) {
        deck.push({
          color: color,
          number: i,
        },{
          color: color,
          number: i,
        });
      }
      // 11 = +2, 12 = Reverse, 13 = Skip turn
      for (let i = 11; i < 14; i++) {
        deck.push({
          color: color,
          number: i,
        },{
          color: color,
          number: i,
        });
      }

      deck.push({
        color: color,
        number: 14, //Choose color
      },{
        color: color,
        number: 15, //+4
      });  
    })

    return deck;
  }

  render() {
    const players = this.state.players;
    const playerCards = players[0].map(card => {
      return (
        <Card 
          color={card.color}
          number={card.number}
          onClick={() => this.handleClick(card)}
        />
      )
    })
    const AICARDS = players[1].map(card => {
      return (
        <Card 
          color={card.color}
          number={card.number}
          onClick={() => this.handleClick(card)}
        />
      )
    })

    return (
      <div className="game">
        <div className="player-cards">{AICARDS}</div>
        <div className="topcard">
          <Card
            color={this.state.topcard.color}
            number={this.state.topcard.number}
            onClick={() => console.log("Nice Try")}
          />
        </div>
        <div className="player-cards">{playerCards}</div>
      </div>
    );
  }
}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);