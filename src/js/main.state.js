import { Map }          from './map';
import { Hero }         from './hero.sprite';
import { Enemy }        from './enemy.sprite';
import { AudioManager } from './audio.manager';

const GRAVITY_SPEED = 300;

export class MainState extends Phaser.State {
  init() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  create() {
    this.physics.arcade.gravity.y = GRAVITY_SPEED;

    this.enemies = this.game.add.group();

    this.hero = new Hero(this, this.game.world.centerX, this.game.world.centerY);
    this.map = new Map(this, 'testLevel');

    this.audioManager = new AudioManager(this.game);
    this.audioManager.playMusic('music0');

    this.createHUD();
  }

  update() {
    this.game.physics.arcade.collide(this.hero, this.map.platforms);
    this.game.physics.arcade.collide(this.enemies, this.map.platforms);

    if (this.audioManager.isMuted()) {
      this.soundText.text = 'SOUND: NO';
    } else {
      this.soundText.text = 'SOUND: YES';
    }
  }

  render() {
    //this.game.debug.body(this.hero);
  }

  createHUD() {
    this.soundText = this.game.add.bitmapText(this.game.width - 10, 10, 'gameBoy', '', 12);
    this.soundText.fixedToCamera = true;
    this.soundText.anchor.setTo(1, 0);
  }
}
