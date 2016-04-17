export class WanderBehavior {
  constructor(user) {
    this.user = user;
    this.game = this.user.game;
    this.scheduleNextMove();

    this.user.body.velocity.x = this.user.speed;
  }

  update() {
  }

  scheduleNextMove() {
    let timer = this.game.time.create(this.game, true);

    timer.add(2 * Phaser.Timer.SECOND, () => {
      let random = this.game.rnd.integerInRange(1, 10);
      if (random < 5) {
        this.user.body.velocity.x = 0;
      } else if (random < 8) {
        this.user.body.velocity.x = -this.user.speed;
      } else {
        this.user.body.velocity.x = this.user.speed;
      }
      this.scheduleNextMove();
    });

    timer.start();
  }
}
