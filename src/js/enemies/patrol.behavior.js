export class PatrolBehavior {
  constructor(user, maxDistance) {
    this.user = user;
    this.maxDistance = maxDistance;

    this.initialPosition = new Phaser.Point()
    this.initialPosition.copyFrom(user.position);
  }

  update() {
    const { velocity, position } = this.user.body;

    if (!this.user.talking && !this.user.chasing && !this.user.startChasing) {
      if (position.x <= (this.initialPosition.x - this.maxDistance)) {
        this.user.body.velocity.x = this.user.speed;
      } else if (position.x >= (this.initialPosition.x + this.maxDistance)) { 
        this.user.body.velocity.x = -this.user.speed;
      }
    }
  }
}
