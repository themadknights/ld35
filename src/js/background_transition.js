export class BackgroundTransition extends Phaser.Sprite {
  constructor(state, { x, y, properties }) {
    super(state.game, x, y, 'hero');
    this.gameState = state;

    this.anchor.setTo(0.5);

    this.game.physics.arcade.enable(this);
    this.alpha = 0;

    this.body.allowGravity = false;

    this.body.height = this.game.height;
    this.position.y = this.game.height / 2;

    this.active = false;

    this.leftTransition = properties.left;
    this.rightTransition = properties.right;
  }

  update() {
    if (this.checkHeroOverlap()) {
      this.active = true;
    } else {
      if (this.active) {
        if (this.gameState.hero.position.x > this.position.x) {
          this.gameState.makeBackgroundTransitionTo(`${this.rightTransition}_background`);
        } else {
          this.gameState.makeBackgroundTransitionTo(`${this.leftTransition}_background`);
        }
        this.active = false;
      }
    }
  }

  checkHeroOverlap() {
    var boundsA = this.getBounds();
    var boundsB = this.gameState.hero.getBounds();

    boundsA.height = this.game.height;

    return Phaser.Rectangle.intersects(boundsA, boundsB);
  }
}
