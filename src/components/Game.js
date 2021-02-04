import React from 'react';
import Board from './Board';
import BoardInitializer from './BoardInitializer';
import KilledPieces from './KilledPieces';
import { createStore, set } from 'idb-keyval';

export default class Game extends React.Component {
  constructor() {
    super();
    this.store = new createStore('chess-game', 'pieces');
    this.state = {
      squares: BoardInitializer(),
      status: '',
      selection: false,
      whiteKilledPieces: [],
      blackKilledPieces: [],
      killed: false,
      player: 1,
      srcIndex: -1,
      warning: '',
      turn: 'White',
      checkmate: '',
      dest: null,
    };
  }

  swap = (input, index_A, index_B) => {
    let temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
    input[index_A] = null;
  };

  srcHandeler = (squares, srcIndex, player, i) => {
    if (squares[i] && squares[i].player === this.state.player) {
      squares[i].style = {
        ...squares[i].style,
        backgroundColor: 'rgb(247, 248, 132)',
      };
      this.setState({
        srcIndex: i,
        warning: 'Now Choose Your Destination',
      });
    } else {
      this.setState({
        warning: `Select Player ${this.state.player} Pieces`,
      });
    }
  };

  destHandeler = (squares, player, srcIndex, i) => {
    let destIndex = i;
    const destOccupied = squares[i] ? true : false;
    const ispossibleMove = squares[srcIndex].possibleMove(
      srcIndex,
      destIndex,
      destOccupied
    );
    const destPath = squares[srcIndex].destPath(srcIndex, destIndex);
    const jumpPossible = this.pieceJumphHandeler(destPath);
    const whiteKilledPieces = this.state.whiteKilledPieces.slice();
    const blackKilledPieces = this.state.blackKilledPieces.slice();

    if (ispossibleMove && jumpPossible) {
      if (squares[destIndex] !== null && squares[destIndex].player !== player) {
        if (squares[destIndex].player === 1) {
          whiteKilledPieces.push(squares[destIndex]);
          this.setState({
            whiteKilledPieces: whiteKilledPieces,
            killed: true,
          });
        } else {
          blackKilledPieces.push(squares[destIndex]);
          this.setState({
            blackKilledPieces: blackKilledPieces,
            killed: true,
          });
        }
      }
      if (
        squares[destIndex] &&
        squares[destIndex].constructor.name === 'King' &&
        squares[destIndex].player !== player
      ) {
        this.setState({
          checkmate: `${this.state.turn} Player Won the Game 🙂`,
        });
        setTimeout(() => {
          // window.location.reload()
          this.setState({
            squares: BoardInitializer(),
            status: '',
            selection: false,
            whiteKilledPieces: [],
            blackKilledPieces: [],
            killed: false,
            player: 1,
            srcIndex: -1,
            warning: '',
            turn: 'White',
            checkmate: '',
          });
        }, 3000);
      }

      if (
        squares[destIndex] &&
        squares[destIndex].player === squares[srcIndex].player
      ) {
        this.srcHandeler(squares, srcIndex, player, i);
        squares[srcIndex].style = {
          ...squares[srcIndex].style,
          backgroundColor: '',
        };
      } else {
        squares[srcIndex].style = {
          ...squares[srcIndex].style,
          backgroundColor: '',
        };
        this.swap(squares, srcIndex, destIndex);
        console.log(srcIndex, destIndex);
        this.setState({
          srcIndex: -1,
          turn: player === 1 ? 'Black' : 'White',
          player: player === 1 ? 2 : 1,
        });
      }
    } else {
      this.setState({
        warning: 'Wrong Destination',
      });
    }
  };

  clickHandeler = (i) => {
    let { squares, player, srcIndex } = this.state;
    set('piece', squares, this.store);

    this.setState({
      warning: '',
    });
    //src selection
    if (srcIndex === -1) {
      this.srcHandeler(squares, srcIndex, player, i);
    }
    // destination selection
    else {
      this.destHandeler(squares, player, srcIndex, i);
    }
  };
  resetHandeler = () => {
    this.setState({
      squares: BoardInitializer(),
      status: '',
      selection: false,
      whiteKilledPieces: [],
      blackKilledPieces: [],
      killed: false,
      player: 1,
      srcIndex: -1,
      warning: '',
      turn: 'White',
      checkmate: '',
    });
  };
  pieceJumphHandeler = (destPath) => {
    let jump = true;
    for (let i = 0; i < destPath.length; i++) {
      if (this.state.squares[destPath[i]] !== null) {
        jump = false;
      }
    }
    return jump;
  };

  render() {
    return (
      <>
        <div className='main'>
          <div className='game-board'>
            <Board
              squares={this.state.squares}
              onClick={(i) => this.clickHandeler(i)}
            />
          </div>
          <div className='game-info'>
            <h4>Turn of Player</h4>
            <div
              className='player-turn-box'
              style={{ backgroundColor: this.state.turn }}
            ></div>
            <div className='game-status'>
              <h3>{this.state.warning}</h3>
              <h3>{this.state.checkmate}</h3>
            </div>
            <button className='btn btn-success' onClick={this.resetHandeler}>
              Reset Pieces
            </button>

            {!this.state.killed ? '' : <h4>Killed Pieces</h4>}
            <div className='killed'>
              <div className='pieces'>
                <KilledPieces
                  whiteKilledPieces={this.state.whiteKilledPieces}
                  blackKilledPieces={this.state.blackKilledPieces}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
