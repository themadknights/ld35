import { Hero } from './hero.sprite';

export class MainState extends Phaser.State {
  create() {
    this.hero = new Hero(this, this.game.world.centerX, this.game.world.centerY);
  }
}
