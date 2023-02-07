import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Card(props) {
  let style = ["card", props.color, props.number];
  const cards = {
    11: ["card", props.color, "+2"],
    12: ["card skip", props.color, "↺"], //reverse
    13: ["card skip", props.color, "🛇"], //skip
    14: ["card select-color", "black", ""], //select color
    15: ["card", "orange", "+4"]
  };

  if (props.number > 9) style = cards[props.number];

  return (
    <button className={style[0]}
      style={{backgroundColor: style[1]}}
      onClick={() => props.onClick({color: props.color, number: props.number})}
    >
      {style[2]}
    </button>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: this.createDeck(),
      topcard: {number: 0, color: 'red'},
      currentPlayerIndex: 0,
      clockwise: true,
      players: [[],[]],
    };

  }

  componentDidMount() {
    this.shuffleDeck();
    this.setTopcard();
    this.drawCards(0,7);
    this.drawCards(1,7)
 }

  createDeck() {
    let deck = [];
    const colors = ['red','blue','chartreuse','gold'];

    colors.forEach(color => {
      deck.push({
        pIndex: -1,
        color: color,
        number: 0,
      },{
        pIndex: -1,
        color: color,
        number: 14, //Choose color
      },{
        pIndex: -1,
        color: color,
        number: 15, //+4
      });

      for (let i = 1; i < 14; i++) {
        if (i !== 10){
          deck.push({
            pIndex: -1,
            color: color,
            number: i,
          },{
            pIndex: -1,
            color: color,
            number: i,
          });
        } 
      }
    });

    return deck;
  }

  shuffleDeck() {
    let deck = this.state.deck;
    deck.sort(() => Math.random() - 0.5);

    this.setState({
      deck: deck,
    })
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
      let card = deck.pop();
      console.log(card.pIndex);
      card.playerIndex = playerIndex;
      console.log(card.pIndex);
      players[playerIndex].push(card);
    }

    this.setState({
      deck: deck,
      players: players,
    })
  }

  handleClick(selectedCard) {
    let players = this.state.players;
    let topcard = this.state.topcard;
    let currentPlayerIndex = this.state.currentPlayerIndex;
    const playerIndex = 0;
    const availableMoves = this.getAvailableMoves(topcard, playerIndex);
    

    if (availableMoves.length === 0) {
      this.drawCards(currentPlayerIndex, 1);
      currentPlayerIndex = this.updateCurrentPlayer();

      this.setState({
        currentPlayerIndex: currentPlayerIndex,
      },() => {
        this.handleAI();
      });
    }
    else if (availableMoves.includes(selectedCard)){
      const index = this.getCardIndex(selectedCard, currentPlayerIndex);
  
      players[playerIndex].splice(index, 1);
      currentPlayerIndex = this.updateCurrentPlayer();
  
      this.setState({
        players: players,
        topcard: selectedCard,
        currentPlayerIndex: currentPlayerIndex,
      },() => {
        this.handleAI();
      });
    }
  }

 async handleAI() {
    await timeout(1000);
    let players = this.state.players;
    let currentPlayerIndex = this.state.currentPlayerIndex;
    const moves = this.getAvailableMoves(this.state.topcard, 1);

    if (moves.length > 0 ){
      const randomIndex = Math.floor(Math.random() * moves.length);
      const selectedCard = moves[randomIndex];
      const cardIndex = this.getCardIndex(selectedCard, currentPlayerIndex)
      players[currentPlayerIndex].splice(cardIndex,1);

      currentPlayerIndex = this.updateCurrentPlayer();
      
      this.setState({
        players: players,
        topcard: moves[randomIndex],
        currentPlayerIndex: currentPlayerIndex,
      })
    }
    else {
      this.drawCards(currentPlayerIndex, 1);
      currentPlayerIndex = this.updateCurrentPlayer();

      this.setState({
        currentPlayerIndex: currentPlayerIndex,
      })
    }
  }

  updateCurrentPlayer() {
    const clockwise = this.state.clockwise;
    let currentPlayerIndex = this.state.currentPlayerIndex;
    const players = this.state.players;

    if (clockwise) return ++currentPlayerIndex > players.length - 1 ? 0 : currentPlayerIndex;
    
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
  
  hasPlusTwo(cards) {
    let hasTwo = false;

    cards.forEach(card => {
      if (card.number === 11) {
        hasTwo = true;
      }
    });

    return hasTwo;
  }

  getCardIndex(card, playerIndex) {
    return this.state.players[playerIndex].findIndex(object => 
    {
      return object.color === card.color && object.number === card.number;
    });
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
    const AICards = players[1].map(card => {
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
        <div className="player-cards">{AICards}</div>
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

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);