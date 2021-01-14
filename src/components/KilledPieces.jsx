import React from 'react';
import '../index.css';
import Square from './Square';

export default class FallenSoldierBlock extends React.Component {

	renderSquare(square, i, squareShade) {
		return (<Square
			keyValue={i}
			piece={square}
			style={square.style}
		/>)
	}

	render() {
		return (
			<div>
				<div className="board-row">{this.props.whiteKilledPieces.map((white, i) =>
					this.renderSquare(white, i)
				)}</div>
				<div className="board-row">{this.props.blackKilledPieces.map((black, i) =>
					this.renderSquare(black, i)
				)}</div>
			</div>
		);
	}
}