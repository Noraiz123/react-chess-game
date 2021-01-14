import Pieces from './Pieces';

export default class Queen extends Pieces {
	constructor(player) {
		super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" :
			"https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"));
	}
	possibleMove(srcIndex, destIndex) {
		let mod = srcIndex % 8;
		let diff = 8 - mod;

		return (Math.abs(srcIndex - destIndex) % 9 === 0 || Math.abs(srcIndex - destIndex) % 7 === 0) ||
			(Math.abs(srcIndex - destIndex) % 8 === 0 || (destIndex >= (srcIndex - mod) && destIndex < (srcIndex + diff)));
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
		else if (Math.abs(srcIndex - destIndex) % 9 === 0) {
			increment = 9;
			start += 9;
		}
		else if (Math.abs(srcIndex - destIndex) % 7 === 0) {
			increment = 7;
			start += 7;
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