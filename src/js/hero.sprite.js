const MOVEMENT_MAX_SPEED = 100;
const JUMP_SPEED = 300;

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

    this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
    this.jumpKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  }

  update() {
    if (this.leftKey.isDown) {
      this.body.velocity.x = -MOVEMENT_MAX_SPEED;
    } else if (this.rightKey.isDown) {
      this.body.velocity.x = MOVEMENT_MAX_SPEED;
    } else {
      this.body.velocity.x = 0;
    }

    if (this.body.blocked.down && this.jumpKey.isDown) {
      this.gameState.audioManager.playFx('jumpFx');
      this.body.velocity.y = -JUMP_SPEED;
    }
  }
}
