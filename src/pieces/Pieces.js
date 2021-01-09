import React from 'react'


class Pieces {
	constructor(player, iconUrl) {
		this.player = player;
		this.style = { backgroundImage: `url(${iconUrl})` };

	}
}
export default Pieces;