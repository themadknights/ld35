export class ChaseBehavior {
  constructor(user, speed, minDistance) {
    this.user = user;
    this.speed = speed;
    this.gameState = this.user.gameState;
    this.previousSpeed = this.user.speed;
  }

  update() {
    const { hero } = this.gameState;
    const absDistanceX = Math.abs(this.user.position.x - hero.position.x);

    if (this.user.canSeeHero() && !hero.isSafeTransformedFor(this.user)) {
      if (hero.position.x < this.user.position.x) {
        this.user.body.velocity.x = -this.speed;
      } else {
        this.user.body.velocity.x = this.speed;
      }
    }
  }
}
