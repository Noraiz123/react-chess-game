import Pieces from './Pieces';

class King extends Pieces {
	constructor(player) {
		super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" :
			"https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"));
	}
	possibleMove(srcIndex, destIndex) {
		return (
			srcIndex - 9 === destIndex || srcIndex - 7 === destIndex ||
			srcIndex - 8 === destIndex || srcIndex + 1 === destIndex ||
			srcIndex + 9 === destIndex || srcIndex + 8 === destIndex ||
			srcIndex + 7 === destIndex || srcIndex - 1 === destIndex
		)
	}


}

export default King;