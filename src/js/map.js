export class Map extends Phaser.Tilemap {
  constructor(state, levelId) {
    super(state.game, levelId);

    this.gameState = state;

    this.addTilesetImage('tileset');
    this.setCollisionBetween(1,99);

    this.background = this.createLayer('background');

    this.platforms = this.createLayer('foreground');
    this.platforms.resizeWorld();
  }
}
