import { CANVAS_W, CANVAS_H } from './constants';

import { PreloadState }       from './preload.state';
import { PublisherState }     from './publisher.state';
import { LoadState }          from './load.state';
import { InstructionsState }  from './instructions.state';
import { StartState }         from './start.state';
import { MainState }          from './main.state';

export class Game extends Phaser.Game {
  constructor () {
    super(CANVAS_W, CANVAS_H, Phaser.CANVAS, "game", null, false, false);

    this.state.add('preload'      , new PreloadState());
    this.state.add('load'         , new LoadState());
    this.state.add('publisher'    , new PublisherState());
    this.state.add('instructions' , new InstructionsState());
    this.state.add('start'        , new StartState());
    this.state.add('main'         , new MainState());

    this.state.start('preload');
  }
}
