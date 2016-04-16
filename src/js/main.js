import { PreloadState } from './preload.state';
import { LoadState } from './load.state';
import { MainState } from './main.state';

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 576;

export class Game extends Phaser.Game {
  constructor () {
    super(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.CANVAS, "game", null, false, false);

    this.state.add('preload', new PreloadState());
    this.state.add('load', new LoadState());
    this.state.add('main', new MainState());

    this.state.start('preload');
  }
}

new Game();
