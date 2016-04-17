import { WanderBehavior } from './wander.behavior';
import { ChaseBehavior } from './chase.behavior';

export class Enemy extends Phaser.Sprite {
  constructor(state, x, y, spriteId) {
    super(state.game, x, y, spriteId);

    this.gameState = state;
    this.anchor.setTo(0.5);

    this.game.add.existing(this);

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.behaviors = {};
    this.currentBehavior = null;
  }

  update() {
    if (this.body.velocity.x > 0) {
      this.scale.setTo(1, 1);
    } else {
      this.scale.setTo(-1, 1);
    }

    if (this.currentBehavior) {
      this.currentBehavior.update();
    }
  }
}
