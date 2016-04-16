import { WanderBehavior } from './wander.behavior';
import { ChaseBehavior } from './chase.behavior';

export class Enemy extends Phaser.Sprite {
  constructor(state, x, y) {
    super(state.game, x, y, 'villagers');

    this.gameState = state;
    this.anchor.setTo(0.5);

    this.game.add.existing(this);

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.animations.add("idle", [0, 1], 2, true);
    this.play("idle");

    this.behaviors = {};
    this.currentBehavior = null;

    // Debug purposes
    //this.behaviors["wander"] = new WanderBehavior(this, 100, 128);
    //this.currentBehavior = this.behaviors["wander"];
    this.behaviors["chase"] = new ChaseBehavior(this, 75, 200);
    this.currentBehavior = this.behaviors["chase"];
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
