export class ChaseBehavior {
  constructor(user, speed, minDistance) {
    this.user = user;
    this.game = this.user.game;
    this.speed = speed;
    this.gameState = this.user.gameState;
  }

  update() {
    const { hero } = this.gameState;
    const absDistanceX = Math.abs(this.user.position.x - hero.position.x);

    if (this.user.startChasing || (this.user.canSeeHero() && !hero.isSafeTransformedFor(this.user))) {
      if (this.user.chasing) {
        if (hero.position.x < this.user.position.x) {
          this.user.body.velocity.x = -this.speed;
        } else {
          this.user.body.velocity.x = this.speed;
        }
      } else if(!this.user.startChasing) {
        this.user.stopTalking();
        this.user.startChasing = true;
        this.user.body.velocity.x = 0;

        this.user.frame += 2;

        let tween = this.game.add.tween(this.user).to( { y: "-10" }, 100, "Linear", true, 0, 0);
        tween.yoyo(true);

        tween.onComplete.add(() => {
          this.user.startChasing = false;
          this.user.chasing = true;
          this.user.frame -= 2;
        });
      }
    } else {
      this.user.chasing = false;
    }
  }
}
