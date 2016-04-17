export class DontStop {
  constructor(user) {
    this.user = user;
  }

  update() {
    if (this.user.body.velocity.x === 0 && 
        !this.user.chasing && !this.user.startChasing &&
        !this.user.talking) {
      this.user.body.velocity.x = this.user.normalVelocity;
    }
  }
}
