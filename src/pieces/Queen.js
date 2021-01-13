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

}