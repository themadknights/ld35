import { TILE_SIZE } from '../map';

export class DontFallBehavior {
  constructor(user) {
    this.user = user;
  }

  update() {
    const { gameState, body } = this.user;
    const { right, bottom, velocity, position } = body;

    if (velocity.x > 0) {
      let rightTile = gameState.map.getTileWorldXY(right, bottom + 1, TILE_SIZE, TILE_SIZE);
      if(!rightTile) {
        velocity.x *= -1;
      }
    } else {
      let leftTile = gameState.map.getTileWorldXY(position.x, bottom + 1, TILE_SIZE, TILE_SIZE);
      if(!leftTile) {
        velocity.x *= -1;
      }
    }
  }
}
