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
  }

  update() {
    this.game.physics.arcade.collide(this.hero, this.map.platforms);
    this.game.physics.arcade.collide(this.enemies, this.map.platforms);
  }

  render() {
    //this.game.debug.body(this.hero);
  }
}
