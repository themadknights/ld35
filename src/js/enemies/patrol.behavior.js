export class PatrolBehavior {
  constructor(user, maxDistance) {
    this.user = user;
    this.maxDistance = maxDistance;

    this.initialPosition = new Phaser.Point()
    this.initialPosition.copyFrom(user.position);
  }

  update() {
    const { velocity, position } = this.user.body;

    if (!this.user.talking) {
      if (position.x <= this.initialPosition.x - this.maxDistance ||
        position.x >= this.initialPosition.x + this.maxDistance) { 
        this.user.body.velocity.x *= -1;
      }
    }
  }
}
