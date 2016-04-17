import { Enemy }            from './enemy.sprite';

import { DontFallBehavior } from './dont_fall.behavior';
import { PatrolBehavior }   from './patrol.behavior';
import { WanderBehavior }   from './wander.behavior';
import { ChaseBehavior }    from './chase.behavior';

export const WOMAN_FRAME = 0;
export const MAN_FRAME = 3;
export const BOY_FRAME = 6;

const VILLAGER_MAX_SPEED = 100;
const VILLAGER_CHASE_MAX_SPEED = 300;

export class Villager extends Enemy {
  constructor(state, { x, y, frame, properties }) {
    super(state, x, y, 'villagers');
    this.frame = frame;

    this.animations.add("talk", [frame, frame + 1], 2, true);

    if (properties.facing === "left") {
      this.speed = -VILLAGER_MAX_SPEED;
      this.scale.setTo(-1, 1);
    } else {
      this.speed = VILLAGER_MAX_SPEED;
    }

    this.behaviors["dont_fall"] = new DontFallBehavior(this);
    //this.behaviors["patrol"] = new PatrolBehavior(this, 64);
    this.behaviors["wander"] = new WanderBehavior(this);
    this.behaviors["chase"] = new ChaseBehavior(this, VILLAGER_CHASE_MAX_SPEED, 200);
  }
}
