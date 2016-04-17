export class PatrolBehavior {
  constructor(user, maxDistance) {
    this.user = user;
    this.maxDistance = maxDistance;

    this.initialPosition = new Phaser.Point()
    this.initialPosition.copyFrom(user.position);

    this.user.body.velocity.x = this.user.speed;
    this.previousSpeed = this.user.speed;
  }

  update() {
    const { velocity, position } = this.user.body;

    if (!this.user.talking) {
      if (position.x <= this.initialPosition.x - this.maxDistance) { 
        velocity.x = this.user.speed;
      } else if (position.x >= this.initialPosition.x + this.maxDistance) { 
        velocity.x = -this.user.speed;
      }
    }
  }
}
