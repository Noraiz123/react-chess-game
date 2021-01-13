import Pieces from './Pieces';

export default class Rook extends Pieces {
	constructor(player) {
		super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" :
			"https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"));
	}

	possibleMove(srcIndex, destIndex) {
		let mod = srcIndex % 8;
		let diff = 8 - mod;
		return (Math.abs(srcIndex - destIndex) % 8 === 0 || (destIndex >= (srcIndex - mod) && destIndex < (srcIndex + diff)));
	}

}