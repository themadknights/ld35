export class WanderBehavior {
  constructor(user, speed, maxDistance) {
    this.user = user;
    this.maxDistance = maxDistance;

    this.initialPosition = new Phaser.Point()
    this.initialPosition.copyFrom(user.position);

    this.user.body.velocity.x = speed;
  }

  update() {
    let { position } = this.user.body;

    if (position.x > this.initialPosition.x + this.maxDistance ||
        position.x < this.initialPosition.x - this.maxDistance) {
      this.user.body.velocity.x *= -1;
    }
  }
}
