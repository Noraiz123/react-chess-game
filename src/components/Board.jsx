import React from 'react';
import '../index.css';
import Square from './Square';

export default class Board extends React.Component {
  renderSquare(i, squareShade) {
    return (
      <Square
        keyValue={i}
        piece={this.props.squares[i]}
        style={this.props.squares[i] ? this.props.squares[i].style : null}
        shade={squareShade}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        const squareShade =
          (Even(i) && Even(j)) || (!Even(i) && !Even(j))
            ? 'light-square'
            : 'dark-square';
        squareRows.push(this.renderSquare(i * 8 + j, squareShade));
      }
      board.push(<div className='board-row'>{squareRows}</div>);
    }

    return <div className='board'>{board}</div>;
  }
}

function Even(number) {
  return number % 2 === 0;
}
