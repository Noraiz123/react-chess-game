import Pieces from './Pieces';

export default class Pawn extends Pieces {
  constructor(player) {
    super(
      player,
      player === 1
        ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg'
        : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
    );
    this.initialPositions = {
      1: [48, 49, 50, 51, 52, 53, 54, 55],
      2: [8, 9, 10, 11, 12, 13, 14, 15],
    };
  }

  possibleMove(srcIndex, destIndex, destOccupied) {
    if (this.player === 1) {
      if (
        (destIndex === srcIndex - 8 && !destOccupied) ||
        (destIndex === srcIndex - 16 &&
          this.initialPositions[1].indexOf(srcIndex) !== -1)
      ) {
        return true;
      } else if (
        destOccupied &&
        (destIndex === srcIndex - 9 || destIndex === srcIndex - 7)
      ) {
        return true;
      }
    } else if (this.player === 2) {
      if (
        (destIndex === srcIndex + 8 && !destOccupied) ||
        (destIndex === srcIndex + 16 &&
          this.initialPositions[2].indexOf(srcIndex) !== -1)
      ) {
        return true;
      } else if (
        destOccupied &&
        (destIndex === srcIndex + 9 || destIndex === srcIndex + 7)
      ) {
        return true;
      }
    } else {
      return false;
    }
  }
  destPath(srcIndex, destIndex) {
    if (destIndex === srcIndex - 16) {
      return [srcIndex - 8];
    } else if (destIndex === srcIndex + 16) {
      return [srcIndex + 8];
    }
    return [];
  }
}
