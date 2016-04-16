import { WanderBehavior } from './wander.behavior';

export class Enemy extends Phaser.Sprite {
  constructor(state, x, y) {
    super(state.game, x, y, 'enemy');

    this.anchor.setTo(0.5);

    this.game.add.existing(this);

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.behaviors = {};

    // Debug purposes
    this.behaviors["wander"] = new WanderBehavior(this, 100, 128);

    this.currentBehavior = this.behaviors["wander"];
  }

  update() {
    this.currentBehavior.update();
  }
}
