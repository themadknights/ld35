export class LoadState extends Phaser.State {
  preload() {
    this.loadingText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', "Loading...", 18);
    this.loadingText.anchor.setTo(0.5);
    this.load.spritesheet('player', require('../images/player.png'), 64, 64, 16);
  }

  create () {
    this.game.state.start('main', true, false);
  }
}
