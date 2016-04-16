export const TILE_SIZE = 64;

export class Map extends Phaser.Tilemap {
  constructor(state, levelId) {
    super(state.game, levelId);

    this.gameState = state;

    this.addTilesetImage('tileset');

    this.setCollisionBetween(1, 3);
    //this.setCollision(1);

    this.platforms = this.createLayer('foreground');
    this.platforms.resizeWorld();
    //this.platforms.debug = true;
  }
}
