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
      destIndex: -1,
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

  srcHandeler(squares, player, i) {
    // console.log(squares[i])
    if (squares[i] && squares[i].player === this.state.player) {
      this.setState({
        srcIndex: i,
        // destIndex: -1,
      })

    } else {
      this.setState({
        warning: `Wrong player selected Select  Player ${this.state.player} Pieces`
      })

    }
  }

  destHandeler(squares, player, srcIndex, i) {


    let destIndex = i
    if (squares[i] && squares[i].player === player) {
      this.srcHandeler(squares, player, i)
    } else {

      this.swap(squares, srcIndex, destIndex);
      console.log(srcIndex, destIndex)
      this.setState({
        srcIndex: -1,
        destIndex: i,
        player: player === 1 ? 2 : 1,
      })
    }

    // console.log(squares[i].player)
    // console.log(this.state.destIndex)


  }

  clickHandeler(i) {

    let { squares, player, srcIndex, destIndex } = this.state
    const ispossibleMove = squares[48].possibleMove(48, 40)
    console.log(squares[srcIndex])
    console.log(srcIndex)

    this.setState({
      warning: ''
    })

    if (ispossibleMove) {
      if (srcIndex === -1) {
        this.srcHandeler(squares, player, i)
      }
      // destination selection
      else {
        this.destHandeler(squares, player, srcIndex, i)
      }


    } else {
      this.setState({
        warning: 'wrong Destination'
      })
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
