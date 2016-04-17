export class WanderBehavior {
  constructor(user) {
    this.user = user;
    this.game = this.user.game;
    this.scheduleNextMove();

    this.user.body.velocity.x = this.setRandomSpeed();
  }

  update() {
  }

  scheduleNextMove() {
    let timer = this.game.time.create(this.game, true);

    timer.add(2 * Phaser.Timer.SECOND, () => {
      if (!this.user.talking && !this.chasing) {
        let random = this.game.rnd.integerInRange(1, 10);
        if (random <= 3) {
          this.user.body.velocity.x = 0;
        } else {
          this.setRandomSpeed();
        }
      }
      this.scheduleNextMove();
    });

    timer.start();
  }

  setRandomSpeed() {
    let random = this.game.rnd.integerInRange(1, 10);
    if (random <= 5) {
      this.user.body.velocity.x = -this.user.speed;
    } else {
      this.user.body.velocity.x = this.user.speed;
    }
  }
}
