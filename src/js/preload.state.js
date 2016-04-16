export class PreloadState extends Phaser.State {
  init () {
    this.game.stage.backgroundColor = 0x9BBC0F;
  }

  preload() {
    this.game.load.bitmapFont('carrier_command', require('../fonts/carrier_command.png'), require('../fonts/carrier_command.xml'));
  }

  create () {
    this.game.state.start('load');
  }
}
