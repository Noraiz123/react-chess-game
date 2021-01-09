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

	}

	clickHandeler(i) {
		let squares = this.state.squares
		// console.log(i);
		let srcIndex = this.state.srcIndex

		// console.log("Clicked")s
		// console.log(this.state.squares[i])

		// if (squares[i]) {
		// 	this.setState({
		// 		selection: !this.state.selection
		// 	})

		// 	if (this.state.selection === true) {
		// 		squares[i].style = { ...squares[i].style, backgroundColor: "grey" }

		// 	}
		// 	else {

		// 		squares[i].style = { ...squares[i].style }

		// 	}
		// let index = squares[i].indexOf(squares[i])
		// console.log(index)
		// squares.fill(null);
		// console.log(squares)


		if (srcIndex == -1) {

			this.setState({
				srcIndex: i
			})

		} else {
			let destIndex = i;
			this.setState({
				srcIndex: -1
			})
			this.swap(squares, srcIndex, destIndex);
			console.log(srcIndex, destIndex)

		}




		// console.log(findIndex(this.state.squares[i]))
		// let index = squares.findIndex((element, index) => {
		// 	if (element === squares[i]) {
		// 		return true
		// 	}


		// })
		// console.log(index)


		// console.log(squares[17])
		// console.log(squares[0])
		// this.setState({
		// 	squares: squares


		// })

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
				</div>

			</>
		)
	}

}