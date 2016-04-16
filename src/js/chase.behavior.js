import { TILE_SIZE } from './map';

export class ChaseBehavior {
  constructor(user, speed, minDistance) {
    this.user = user;
    this.speed = speed;
    this.minDistance = minDistance;
    this.gameState = this.user.gameState;
  }

  update() {
    const { hero } = this.gameState;
    const distanceX = this.user.position.x - hero.position.x;
    const absDistanceX = Math.abs(distanceX);
    const distanceY = this.user.position.y - hero.position.y;

    this.user.body.velocity.x = 0;

    if (distanceY < TILE_SIZE) {
      if (absDistanceX > (hero.width / 2) && absDistanceX < this.minDistance) {
        this.user.body.velocity.x = distanceX < 0 ? this.speed : -this.speed;
      }
    }
  }
}
