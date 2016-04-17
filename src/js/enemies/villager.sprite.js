import { Enemy }            from './enemy.sprite';

import { DontFallBehavior } from './dont_fall.behavior';
import { PatrolBehavior }   from './patrol.behavior';
import { WanderBehavior }   from './wander.behavior';
import { ChaseBehavior }    from './chase.behavior';

const VILLAGER_MAX_SPEED = 100;

export class Villager extends Enemy {
  constructor(state, { x, y, frame }) {
    super(state, x, y, 'villagers');
    this.frame = frame;

    this.animations.add("idle", [frame, frame + 1], 2, true);
    this.play("idle");

    this.speed = VILLAGER_MAX_SPEED;

    this.behaviors["dont_fall"] = new DontFallBehavior(this);
    //this.behaviors["patrol"] = new PatrolBehavior(this, 64);
    this.behaviors["wander"] = new WanderBehavior(this);
    this.behaviors["chase"] = new ChaseBehavior(this, 300, 200);
  }
}

// Debug purposes
//this.behaviors["wander"] = new WanderBehavior(this, 100, 128);
//this.currentBehavior = this.behaviors["wander"];
//this.behaviors["chase"] = new ChaseBehavior(this, 75, 200);
//this.currentBehavior = this.behaviors["chase"];
//  velocity.x *= -1;
//if (blocked.left) {
//  velocity.x = this.speed;
//} else if (blocked.right) {
//}
