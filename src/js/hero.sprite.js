const PLAYER_MAX_SPEED = 100;

export class Hero extends Phaser.Sprite {
  constructor(state, x, y) {
    super(state.game, x, y, 'hero');

    this.anchor.setTo(0.5);

    this.game.camera.follow(this);
    this.gameState = state;
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);

    this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
  }

  update() {
    if (this.leftKey.isDown) {
      this.body.velocity.x = -PLAYER_MAX_SPEED;
    } else if (this.rightKey.isDown) {
      this.body.velocity.x = PLAYER_MAX_SPEED;
    } else {
      this.body.velocity.x = 0;
    }
  }
}
