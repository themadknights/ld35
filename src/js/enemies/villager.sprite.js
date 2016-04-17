import { Enemy }            from './enemy.sprite';

import { DontFallBehavior } from './dont_fall.behavior';
import { PatrolBehavior }   from './patrol.behavior';
import { WanderBehavior }   from './wander.behavior';
import { ChaseBehavior }    from './chase.behavior';

import { TILE_SIZE }        from '../map';

export const WOMAN_FRAME = 0;
export const MAN_FRAME = 3;
export const BOY_FRAME = 6;

const MAX_SPEED = 100;
const CHASE_MAX_SPEED = 300;
const MIN_DISTANCE_TO_TALK = 100;
const SECONDS_TALKING = 2;

export class Villager extends Enemy {
  constructor(state, { x, y, frame, properties }) {
    super(state, x, y, 'villagers');
    this.frame = frame;

    this.animations.add("talk", [frame, frame + 1], 2, true);

    if (properties.facing === "left") {
      this.speed = -MAX_SPEED;
      this.scale.setTo(-1, 1);
    } else {
      this.speed = MAX_SPEED;
    }

    this.behaviors["dont_fall"] = new DontFallBehavior(this);
    this.behaviors["patrol"] = new PatrolBehavior(this, TILE_SIZE);
    //this.behaviors["wander"] = new WanderBehavior(this);
    this.behaviors["chase"] = new ChaseBehavior(this, CHASE_MAX_SPEED, 200);

    this.comic = this.game.add.sprite(this.body.width / 1.25, -this.body.height, 'comic');
    this.comic.anchor.setTo(0.5);
    this.comic.scale.setTo(-1, 1);
    this.talkingAbout = this.game.add.sprite(0, 0, 'villagers_miniature');
    this.talkingAbout.anchor.setTo(0.5);
    this.comic.addChild(this.talkingAbout);
    this.comic.visible = false;
    this.addChild(this.comic);
  }

  update(dt) {
    super.update(dt);

    if (!this.talking) {
      this.gameState.enemies.forEach((enemy) => {
        if (enemy !== this && !enemy.talking) {
          let distance = Phaser.Point.distance(this.position, enemy.position);
          if (distance < MIN_DISTANCE_TO_TALK) {
            this.talk();
            enemy.talk(SECONDS_TALKING);
          }
        }
      });
    }
  }

  talk(delay = 0) {
    this.talking = true;
    this.body.velocity.x = 0;
    this.scheduleNextWord(delay);
  }

  scheduleNextWord(delay) {
    let timer = this.game.time.create(this.game, true);
    timer.add(delay * Phaser.Timer.SECOND, () => {
      this.comic.frame = this.game.rnd.integerInRange(0, 1);
      this.talkingAbout.frame = this.game.rnd.integerInRange(0, 8);
      this.comic.visible = !this.comic.visible;
      this.scheduleNextWord(SECONDS_TALKING);
    });
    timer.start();
  }
}
