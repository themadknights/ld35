export class MainState extends Phaser.State {
  create() {
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
    this.player.anchor.setTo(0.5);
  }
}
