import { Hero } from './hero.sprite';

const GRAVITY_SPEED = 300;

export class MainState extends Phaser.State {
  init() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  create() {
    this.physics.arcade.gravity.y = GRAVITY_SPEED;
    this.hero = new Hero(this, this.game.world.centerX, this.game.world.centerY);
  }
}
