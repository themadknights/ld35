export class LoadState extends Phaser.State {
  preload() {
    this.loadingText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', "Loading...", 18);
    this.loadingText.anchor.setTo(0.5);

    this.load.spritesheet('hero', require('../images/hero.png'), 32, 32, 2);
  }

  create () {
    this.game.state.start('main', true, false);
  }
}
