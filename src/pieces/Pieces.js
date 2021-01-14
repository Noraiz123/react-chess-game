class Pieces {
	constructor(player, iconUrl) {
		this.player = player;
		this.style = { backgroundImage: `url(${iconUrl})`, backgroundSize: "cover" };

	}
}
export default Pieces;