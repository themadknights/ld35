import { Conversation }                      from './enemies/conversation';
import { WOMAN_FRAME, MAN_FRAME, BOY_FRAME } from './enemies/villager.sprite';
import { TILE_SIZE }                         from './map';

const MOVEMENT_MAX_SPEED = 150;
const JUMP_SPEED = 300;
const TRANSFORMATION_TIME = 5;
const WARNING_TIME = 4;
const MAX_HEALTH = 2;

export class Hero extends Phaser.Sprite {
  constructor(state, x, y) {
    super(state.game, x, y, 'hero');

    this.anchor.setTo(0.5);

    this.game.camera.follow(this);
    this.gameState = state;
    this.game.add.existing(this);

    this.game.physics.arcade.enable(this);

    this.animations.add("slime", [0, 1], 6, true);

    this.play("slime");

    this.transformed = null;

    this.maxHealth = MAX_HEALTH;
    this.health = this.maxHealth;

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
    if (!this.inputDisabled && this.leftKey.isDown) {
      this.body.velocity.x = -MOVEMENT_MAX_SPEED;
    } else if (!this.inputDisabled && this.rightKey.isDown) {
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

    if (!this.inputDisabled && this.body.blocked.down && this.jumpKey.isDown) {
      this.gameState.audioManager.playFx('jumpFx');
      this.body.velocity.y = -JUMP_SPEED;
    }

    if (this.transformed !== null && this.body.velocity.x !== 0) {
      this.play('walk');
    } else {
      this.animations.stop('walk');
      this.frame = this.transformed;
    }
  }

  transformInto(texture, frame) {
    if (this.transformed === null) {
      this.loadTexture(texture, frame);
      this.body.width = TILE_SIZE / 2;
      this.body.height = TILE_SIZE;
      this.position.y -= TILE_SIZE / 4;
      this.transformed = frame;
      this.gameState.audioManager.playFx('transformationFx');

      this.animations.add("walk", [frame + 3, frame + 4], 4, true);

      this.transformationTimer = this.game.time.create(this.game, true);
      this.transformationTimer.add(TRANSFORMATION_TIME * Phaser.Timer.SECOND, () => {
        this.reverTrasformation();
      });
      this.transformationTimer.start();

      this.warningTimer = this.game.time.create(this.game, true);
      this.warningTimer.add(WARNING_TIME * Phaser.Timer.SECOND, () => {
        this.gameState.audioManager.playFx('warningFx');
        this.reversingTransformationTween = this.game.add.tween(this).to({ alpha: "-0.2" }, 0.1 * Phaser.Timer.SECOND, "Linear", true, 0, -1);
        this.reversingTransformationTween.yoyo(true, 0);
      });
      this.warningTimer.start();
    }
  }

  reverTrasformation() {
    if (this.transformed !== null) {
      this.transformationTimer.destroy();
      this.warningTimer.destroy();
      this.game.tweens.remove(this.reversingTransformationTween);
      this.loadTexture('hero');
      this.body.width = TILE_SIZE / 2;
      this.body.height = TILE_SIZE / 2;
      this.position.y += TILE_SIZE / 4;
      this.transformed = null;
      this.play("slime");
    }
  }

  damage(amount = 1) {
    if(!this.invulnerable) {
      this.reverTrasformation();
      this.invulnerable = true;
      if (!this.godMode) {
        this.health -= amount;
      }
      if (this.health <= 0) {
        this.die();
      } else {
        this.gameState.audioManager.playFx('damageFx');
        this.immunityTween = this.game.add.tween(this).to({ alpha: 0 }, 0.1 * Phaser.Timer.SECOND, "Linear", true, 0, -1);
        this.immunityTween.yoyo(true, 0);
        let timer = this.game.time.create(this.game, true);
        timer.add(2*Phaser.Timer.SECOND, function() {
            this.game.tweens.remove(this.immunityTween);
            this.invulnerable = false;
            this.alpha = 1;
        }, this);
        timer.start();
      }
    }
  }

  die() {
    if (!this.dying) {
      this.dying = true;
      this.gameState.audioManager.playFx('deathFx');
      this.inputDisabled = true;
      this.deathTween = this.game.add.tween(this.scale).to({ x: 0.1, y: 0.1 }, 0.5 * Phaser.Timer.SECOND, "Linear");
      this.deathTween.start();
      this.deathTween.onComplete.add(() => {
        this.gameState.restart();
      });
    }
  }

  isSafeTransformedFor(enemy) {
    let enemyLikes = enemy.likes.map(Conversation.getConversationFrame);
    return enemyLikes.indexOf(this.transformed) !== -1;
  }
}
