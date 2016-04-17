import { FG_COLOR } from './constants';

export class LoadState extends Phaser.State {
  preload() {
    this.loadingText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'gameBoy', "Loading...", 18);
    this.loadingText.tint = FG_COLOR;
    this.loadingText.anchor.setTo(0.5);

    this.load.spritesheet('hero', require('../images/hero.png'), 32, 32, 2);
    this.load.spritesheet('villagers', require('../images/villagers.png'), 64, 64, 9);
    this.load.spritesheet('villagers_miniature', require('../images/villagers_miniature.png'), 16, 16, 9);
    this.load.spritesheet('comic', require('../images/comic.png'), 32, 32, 2);

    this.load.image('village_background', require('../images/village_background.png'));
    this.load.image('tmkLogo', require('../images/TMKGameboyLogoNoTitle.png'));
    this.load.image('tileset', require('../images/tileset.png'));

    this.load.audio('music0', require('../sounds/music0.ogg'));
    this.load.audio('jumpFx', require('../sounds/jump.wav'));

    this.load.tilemap('testLevel', require('../json/test_level.json'), null, Phaser.Tilemap.TILED_JSON);
  }

  create () {
    const stateId = process.env.NODE_ENV === 'production' ? 'publisher' : 'main';

    this.game.state.start(stateId, true, false);
  }
}
