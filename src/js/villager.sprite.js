import { Enemy } from './enemy.sprite';

export class Villager extends Enemy {
  constructor(state, { x, y, frame }) {
    super(state, x, y, 'villagers');
    this.frame = frame;

    this.animations.add("idle", [frame, frame + 1], 2, true);
    this.play("idle");
  }
}

// Debug purposes
//this.behaviors["wander"] = new WanderBehavior(this, 100, 128);
//this.currentBehavior = this.behaviors["wander"];
//this.behaviors["chase"] = new ChaseBehavior(this, 75, 200);
//this.currentBehavior = this.behaviors["chase"];
