import { Enemy }            from './enemy.sprite';

import { DontFallBehavior } from './dont_fall.behavior';
import { PatrolBehavior }   from './patrol.behavior';
import { WanderBehavior }   from './wander.behavior';
import { ChaseBehavior }    from './chase.behavior';

import { Conversation }     from './conversation';

import { TILE_SIZE }        from '../map';

export const WOMAN_FRAME = 0;
export const MAN_FRAME = 3;
export const BOY_FRAME = 6;

const MAX_SPEED = 100;
const CHASE_MAX_SPEED = 300;
const MIN_DISTANCE_TO_TALK = 100;
const TALKING_COOLDOWN = 5;

export class Villager extends Enemy {
  constructor(state, { x, y, frame, properties }) {
    super(state, x, y, 'villagers');
    this.frame = frame;

    this.animations.add("talk", [frame, frame + 1], 2, true);
    this.speed = MAX_SPEED;

    if (properties.facing === "left") {
      this.speed *= -1
      this.scale.setTo(-1, 1);
    }

    if (properties.like) {
      this.likes = properties.like.split(',');
    } else {
      this.likes = [];
    }

    if (properties.dislike) {
      this.dislikes = properties.dislike.split(',');
    } else {
      this.dislikes = [];
    }

    this.body.velocity.x = this.speed;

    this.behaviors["dont_fall"] = new DontFallBehavior(this);

    console.log(properties.behavior);
    if (properties.behavior === "wander") {
      this.behaviors["wander"] = new WanderBehavior(this);
    } else {
      this.behaviors["patrol"] = new PatrolBehavior(this, 2 * TILE_SIZE);
    }
    this.behaviors["chase"] = new ChaseBehavior(this, CHASE_MAX_SPEED, 200);

    this.comic = this.game.add.sprite(this.body.width / 1.25, -this.body.height / 1.25, 'comic');
    this.comic.anchor.setTo(0.5);
    this.comic.scale.setTo(-1, 1);
    this.talkingAbout = this.game.add.sprite(0, 0, 'villagers_miniature');
    this.talkingAbout.anchor.setTo(0.5);
    this.comic.addChild(this.talkingAbout);
    this.comic.visible = false;
    this.addChild(this.comic);

    this.talking = false;
    this.canTalk = true;
  }

  update(dt) {
    super.update(dt);

    if (this.canTalk && !this.talking) {
      this.gameState.enemies.forEach((enemy) => {
        if (enemy !== this && !enemy.talking) {
          let distance = Phaser.Point.distance(this.position, enemy.position);
          if (distance < MIN_DISTANCE_TO_TALK) {
            if (this.isFacingRight() && enemy.isFacingLeft() && this.position.x < enemy.position.x || 
              this.isFacingLeft() && enemy.isFacingRight() && this.position.x > enemy.position.x) {
              new Conversation(this, enemy);
            }
          }
        }
      });
    }
  }

  startTalking() {
    this.talking = true;
    this.body.velocity.x = 0;
  }

  stopTalking() {
    let timer = this.game.time.create(this.game, true);

    this.talking = false;
    this.canTalk = false;
    this.comic.visible = false;

    if (this.isFacingRight()) {
      this.body.velocity.x = -this.speed;
    } else {
      this.body.velocity.x = this.speed;
    }

    timer.add(TALKING_COOLDOWN * Phaser.Timer.SECOND, () => {
      this.canTalk = true;
    });

    timer.start();
  }
}
