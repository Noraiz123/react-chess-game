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

		};
	}
	swap(input, index_A, index_B) {
		let temp = input[index_A];

		input[index_A] = input[index_B];
		input[index_B] = temp;
		input[index_A] = null


	}

	clickHandeler(i) {
		let squares = this.state.squares
		// console.log(i);
		let srcIndex = this.state.srcIndex


		// let destIndex
		if (srcIndex === -1) {

			this.setState({
				srcIndex: i,
				// player: 1

			})

		} else {
			let destIndex = i;
			this.setState({
				srcIndex: -1,
				player: 2
			})
			if (this.state.player === 2) {
				this.setState({
					player: 1
				})
			}
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
					{(this.state.player === 1) ? <div>Turn White</div> :
						<div>Turn BLack</div>}
				</div>

			</>
		)
	}

}