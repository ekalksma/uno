import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Card(props) {
  return (
    <button className="card" 
      style={{backgroundColor: props.color}}
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
      player: [{number: 0, color: 'red'},{number: 0, color: 'red'}],
    };
    console.log(this.state.Deck)
  }

  componentDidMount() {
    this.setTopcard();
 }

  setTopcard() {
    this.setState({
      Topcard: this.state.deck[0]
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
          number: 1,
       })
      }  
    })

    return deck.sort(() => Math.random() - 0.5);
  }

  render() {
    return (
      <div className="game">
        <div className="topcard">
          <Card
            color={this.state.topcard.color}
            number={this.state.topcard.number}
          />
        </div>
        <div className="game-info">
          {this.state.player}
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);