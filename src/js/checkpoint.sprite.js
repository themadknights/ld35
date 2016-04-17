export class Checkpoint extends Phaser.Sprite {
  constructor(state, { x, y }) {
    super(state.game, x, y, 'checkpoint');

    this.animations.add("activate", [0, 1, 2], 6, false);
    this.active = false;
  }

  activate() {
    if (!this.active) {
      this.active = true;
      this.play('activate');
    }
  }

  deActivate() {
    this.active = false;
    this.frame = 0;
  }
}
