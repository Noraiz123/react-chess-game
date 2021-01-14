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

	destPath(srcIndex, destIndex) {
		let path = [], start, end, increment;
		if (srcIndex > destIndex) {
			start = destIndex;
			end = srcIndex;
		}
		else {
			start = srcIndex;
			end = destIndex;
		}
		if (Math.abs(srcIndex - destIndex) % 8 === 0) {
			increment = 8;
			start += 8;
		}
		else {
			increment = 1;
			start += 1;
		}

		for (let i = start; i < end; i += increment) {
			path.push(i);
		}
		return path;
	}

}