import { Enemy }            from './enemy.sprite';

import { DontStop }         from './dont_stop.behavior';
import { DontFallBehavior } from './dont_fall.behavior';
import { PatrolBehavior }   from './patrol.behavior';
import { WanderBehavior }   from './wander.behavior';
import { ChaseBehavior }    from './chase.behavior';

import { Conversation }     from './conversation';

import { TILE_SIZE }        from '../map';

export const WOMAN_FRAME = 0;
export const MAN_FRAME = 5;
export const BOY_FRAME = 10;

const MAX_SPEED = 100;
const CHASE_MAX_SPEED = 200;
const MIN_DISTANCE_TO_TALK = 50;
const MAX_DISTANCE_TO_TALK = 100;
const TALKING_COOLDOWN = 5;

export class Villager extends Enemy {
  constructor(state, { x, y, frame, properties }) {
    super(state, x, y, 'villagers');
    this.initialFrame = frame;

    this.frame = this.initialFrame;

    this.speed = MAX_SPEED;
    this.normalVelocity = this.speed;

    if (properties.facing === "left") {
      this.normalVelocity *= -1;
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

    this.animations.add("talk", [this.initialFrame, this.initialFrame + 1], 2, true);
    this.animations.add("walk", [this.initialFrame + 3, this.initialFrame + 4], 4, true);

    this.behaviors.push(new DontStop(this));

    this.behaviors.push(new DontFallBehavior(this));

    if (properties.behavior === "wander") {
      this.behaviors.push(new WanderBehavior(this));
    } else {
      this.behaviors.push(new PatrolBehavior(this, 2 * TILE_SIZE));
    }

    this.behaviors.push(new ChaseBehavior(this, CHASE_MAX_SPEED, 200));

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
          if (distance < MAX_DISTANCE_TO_TALK && distance > MIN_DISTANCE_TO_TALK) {
            if (this.isFacingRight() && enemy.isFacingLeft() && this.position.x < enemy.position.x || 
              this.isFacingLeft() && enemy.isFacingRight() && this.position.x > enemy.position.x) {
              new Conversation(this, enemy);
            }
          }
        }
      });
    }

    if (this.body.velocity.x !== 0) {
      this.play('walk');
    }
  }

  startTalking() {
    this.talking = true;
    this.body.velocity.x = 0;
    this.frame = this.initialFrame;
    this.animations.stop('walk');
  }

  stopTalking() {
    let timer = this.game.time.create(this.game, true);

    this.talking = false;
    this.canTalk = false;
    this.comic.visible = false;
    this.animations.stop('talk');

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
