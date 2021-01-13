import React from 'react';
import King from '../pieces/King';
import Pieces from '../pieces/Pieces';
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
      turn: 'White',
      checkmate: ''
    };
  }
  swap(input, index_A, index_B) {
    let temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
    input[index_A] = null
  }




  srcHandeler(squares, srcIndex, player, i) {
    if (squares[i] && squares[i].player === this.state.player) {
      squares[i].style = { ...squares[i].style, backgroundColor: "rgb(247, 248, 132)" }
      this.setState({
        srcIndex: i,
        warning: 'Now Choose Your Destination'
      })

    } else {
      this.setState({
        warning: `Wrong player selected Select  Player ${this.state.player} Pieces`
      })

    }


  }

  destHandeler(squares, player, srcIndex, i) {

    let destIndex = i
    const ispossibleMove = squares[srcIndex].possibleMove(srcIndex, destIndex)

    if (ispossibleMove) {
      if (squares[destIndex] && squares[destIndex].constructor.name === 'King') {
        this.setState({
          checkmate: `${this.state.turn} Player Won the Game 🙂`
        })
      }

      if (squares[i] && squares[i].player === player) {
        this.srcHandeler(squares, srcIndex, player, i)
        squares[srcIndex].style = { ...squares[srcIndex].style, backgroundColor: "" }
      } else {
        squares[srcIndex].style = { ...squares[srcIndex].style, backgroundColor: "" }
        this.swap(squares, srcIndex, destIndex);
        console.log(srcIndex, destIndex)
        this.setState({
          srcIndex: -1,
          turn: player === 1 ? 'Black' : 'White',
          player: player === 1 ? 2 : 1,
        })
      }
    } else {
      this.setState({
        warning: 'Wrong Destination'
      })
    }


  }

  clickHandeler(i) {

    let { squares, player, srcIndex } = this.state



    this.setState({
      warning: ''
    })


    if (srcIndex === -1) {
      this.srcHandeler(squares, srcIndex, player, i)

    }
    // destination selection
    else {
      this.destHandeler(squares, player, srcIndex, i)
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
          <div className="game-info">
            <h4>Turn of Player</h4>
            <div className="player-turn-box" style={{ backgroundColor: this.state.turn }}></div>
          </div>
          <div className="game-status">
            <h3>{this.state.warning}</h3>
            <h3>{this.state.checkmate}</h3>
          </div>

        </div>

      </>
    )
  }

}
