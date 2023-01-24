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
      Deck: this.createDeck(),
      Topcard: {number: 0, color: 'red'},
    };
  }

  componentDidMount() {
    this.setTopcard();
 }

  setTopcard() {
    this.setState({
      Topcard: this.state.Deck[0]
    })
  }

  handleClick(i) {
  }

  createDeck() {
    let deck = [];
    for (let i = 0; i < 10; i++) {
      deck.push({
        color: 'red',
        number: 1,
     })
    }

    return deck;
  }

  render() {

    return (
      <div className="game">
        <div className="topcard">
          <Card
            color={this.state.Topcard.color}
            number={this.state.Topcard.number}
          />
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);