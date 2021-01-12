import Pieces from './Pieces';

export default class Knight extends Pieces {
	constructor(player) {
		super(player, (player === 1 ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" :
			"https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
	}
}