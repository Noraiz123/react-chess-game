import Pieces from './Pieces';

export default class Bishop extends Pieces {
	constructor(player) {
		super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" :
			"https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
	}
	possibleMove(srcIndex, destIndex) {
		return (Math.abs(srcIndex - destIndex) % 9 === 0 || Math.abs(srcIndex - destIndex) % 7 === 0);
	}

}