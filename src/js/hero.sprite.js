import { WOMAN_FRAME, MAN_FRAME, BOY_FRAME } from './enemies/villager.sprite';
import { TILE_SIZE } from './map';

const MOVEMENT_MAX_SPEED = 100;
const JUMP_SPEED = 300;
const TRANSFORMATION_TIME = 3;

export class Hero extends Phaser.Sprite {
  constructor(state, x, y) {
    super(state.game, x, y, 'hero');

    this.anchor.setTo(0.5);

    this.game.camera.follow(this);
    this.gameState = state;
    this.game.add.existing(this);

    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.animations.add("idle", [0, 1], 6, true);
    this.play("idle");

    this.transformed = null;

    this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
    this.jumpKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    this.game.input.keyboard.addKey(Phaser.KeyCode.ONE).onDown.add(() => {
      this.transformInto("villagers", WOMAN_FRAME);
    });
    this.game.input.keyboard.addKey(Phaser.KeyCode.TWO).onDown.add(() => {
      this.transformInto("villagers", MAN_FRAME);
    });
    this.game.input.keyboard.addKey(Phaser.KeyCode.THREE).onDown.add(() => {
      this.transformInto("villagers", BOY_FRAME);
    });
  }

  update() {
    if (this.leftKey.isDown) {
      this.body.velocity.x = -MOVEMENT_MAX_SPEED;
    } else if (this.rightKey.isDown) {
      this.body.velocity.x = MOVEMENT_MAX_SPEED;
    } else {
      this.body.velocity.x = 0;
    }

    if (this.transformed !== null) {
      if (this.body.velocity.x > 0) {
        this.scale.setTo(1, 1);
      } else if (this.body.velocity.x < 0) {
        this.scale.setTo(-1, 1);
      }
    }

    if (this.body.blocked.down && this.jumpKey.isDown) {
      this.gameState.audioManager.playFx('jumpFx');
      this.body.velocity.y = -JUMP_SPEED;
    }
  }

  transformInto(texture, frame) {
    if (this.transformed === null) {
      this.loadTexture(texture, frame);
      this.body.width = TILE_SIZE;
      this.body.height = TILE_SIZE;
      this.position.y -= TILE_SIZE / 4;
      this.transformed = frame;
      let timer = this.game.time.create(this.game, true);
      timer.add(TRANSFORMATION_TIME * Phaser.Timer.SECOND, () => {
        this.reverTrasformation();
      });
      timer.start();
    }
  }

  reverTrasformation() {
    this.loadTexture('hero');
    this.body.width = TILE_SIZE / 2;
    this.body.height = TILE_SIZE / 2;
    this.position.y += TILE_SIZE / 4;
    this.transformed = null;
  }

  isSafeTransformedFor(enemy) {
    return true;
    return this.transformed === BOY_FRAME;
  }
}
