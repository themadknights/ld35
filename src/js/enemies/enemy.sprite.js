import { TILE_SIZE }      from '../map';

const ENEMY_SIGHT_DISTANCE = 200;

export class Enemy extends Phaser.Sprite {
  constructor(state, x, y, spriteId) {
    super(state.game, x, y, spriteId);

    this.gameState = state;
    this.anchor.setTo(0.5);

    this.game.add.existing(this);

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.behaviors = [];
  }

  update() {
    if (this.body.velocity.x > 0) {
      this.scale.setTo(1, 1);
    } else if (this.body.velocity.x < 0) {
      this.scale.setTo(-1, 1);
    }

    this.behaviors.forEach(behavior => behavior.update());
  }

  canSeeHero() {
    const { hero } = this.gameState;
    const distanceX = this.position.x - hero.position.x;
    const absDistanceX = Math.abs(distanceX);
    const absDistanceY = Math.abs(this.position.y - hero.position.y);

    if (absDistanceY > TILE_SIZE) {
      return false;
    }

    if (this.body.velocity.x >= 0 && 
        this.isFacingRight() &&
        hero.position.x >= this.body.position.x &&
        absDistanceX < ENEMY_SIGHT_DISTANCE) {
        return true;
    }

    if (this.body.velocity.x <= 0 && 
        this.isFacingLeft() &&
        hero.position.x <= this.body.position.x &&
        absDistanceX < ENEMY_SIGHT_DISTANCE) {
        return true;
    }

    return false;
  }

  isFacingRight() {
    return this.scale.x === 1;
  }

  isFacingLeft() {
    return this.scale.x !== 1;
  }
}
