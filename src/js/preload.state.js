import { BG_COLOR } from './constants';

export class PreloadState extends Phaser.State {
  init () {
    this.game.stage.backgroundColor = BG_COLOR;
  }

  preload() {
    this.game.load.bitmapFont('carrier_command', require('../fonts/carrier_command.png'), require('../fonts/carrier_command.xml'));
  }

  create () {
    this.game.state.start('load');
  }
}
