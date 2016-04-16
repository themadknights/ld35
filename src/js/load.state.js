export class LoadState extends Phaser.State {
  preload() {
    this.loadingText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', "Loading...", 18);
    this.loadingText.anchor.setTo(0.5);

    this.load.spritesheet('hero', require('../images/hero.png'), 32, 32, 2);

    this.load.image('tileset', require('../images/tileset.png'));

    this.load.tilemap('testLevel', require('../json/test_level.json'), null, Phaser.Tilemap.TILED_JSON);
  }

  create () {
    this.game.state.start('main', true, false);
  }
}
