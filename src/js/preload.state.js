import { BG_COLOR } from './constants';

export class PreloadState extends Phaser.State {
  init () {
    this.game.stage.backgroundColor = BG_COLOR;
  }

  preload() {
    this.game.load.bitmapFont('gameBoy', require('../fonts/game_boy.png'), require('../fonts/game_boy.xml'));
  }

  create () {
    this.game.state.start('load');
  }
}
