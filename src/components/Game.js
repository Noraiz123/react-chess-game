import React from 'react';
import Board from './Board';
import BoardInitializer from './BoardInitializer';




export default class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      squares: BoardInitializer(),
      status: '',
      selection: false,
      player: 1,
      srcIndex: -1,
      warning: '',
      turn: 'white',
    };
  }
  swap(input, index_A, index_B) {
    let temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
    input[index_A] = null


  }
  srcHandeler(i) {
    this.setState({
      srcIndex: i,
    })
  }
  destHandeler(player) {

    this.setState({
      srcIndex: -1,
      player: player === 1 ? 2 : 1,
    })
  }
  clickHandeler(i) {

    let { squares, player, srcIndex } = this.state

    this.setState({
      warning: ''
    })

    if (srcIndex === -1) {
      console.log(squares[i])
      if (squares[i] && squares[i].player === this.state.player) {
        this.srcHandeler(i)

      } else {
        this.setState({
          warning: `wrong player selected Select  Player ${this.state.player} Pieces`
        })

      }
    }
    // destination selection
    else {
      let destIndex = i;
      this.destHandeler(player)

      this.swap(squares, srcIndex, destIndex);
      console.log(srcIndex, destIndex)
    }







  }











  render() {
    return (
      <>
        <div className="main">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={(i) => this.clickHandeler(i)}
            />

          </div>
          <div>
            {(this.state.player === 1) ? <div>Turn White</div> :
              <div>Turn BLack</div>}
          </div>
          <div className="game-status">
            {this.state.warning}
          </div>

        </div>

      </>
    )
  }

}
