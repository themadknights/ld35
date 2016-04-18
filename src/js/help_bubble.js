const SHOW_TEXT_TIME = 10;

const HELP_TEXT = {
  control_and_checkpoint: `
    Welcome to the training grounds!

    So, you know how to move right?
    How about jumping?

    Don't worry if you die. You have 
    a checkpoint next to you.
  `,
  enemies: `
    This is an enemy. Be careful!

    Just kidding. That villager is a
    marionette. It can still hurt you
    but you are gonna survive.

    Keep moving!
  `,
  mechanic: `
    You need to know your enemy.

    Spy on them and know their likes.
    You can transform into them using
    the numbers.

    If you transform in something they
    like you will be safe!
  `
};

export class HelpBubble extends Phaser.Sprite {
  constructor(state, { x, y, name }) {
    super(state.game, x, y, 'hero');
    this.gameState = state;

    this.anchor.setTo(0.5);

    this.game.physics.arcade.enable(this);
    this.alpha = 0;

    this.body.allowGravity = false;

    this.body.height = this.game.height;
    this.position.y = this.game.height / 2;

    this.textId = name;
    this.active = false;
  }

  activate() {
    if (!this.active) {
      const { helpBubbleText, helpBubbleBackground } = this.gameState;

      if (this.textId === 'mechanic') {
        this.gameState.transformationBar.alpha = 1;
      }

      this.active = true;

      if (helpBubbleText.timer) {
        helpBubbleText.timer.stop();
      }

      helpBubbleText.text = this.getText();

      helpBubbleText.scale.setTo(0.1);
      helpBubbleText.alpha = 0;
      helpBubbleBackground.scale.setTo(0.1);
      helpBubbleBackground.alpha = 0;

      this.game.add.tween(helpBubbleText).to({
          alpha: 1
      },  Phaser.Timer.HALF, "Linear", true).start();
      this.game.add.tween(helpBubbleText.scale).to({
          x: 1,
          y: 1
      },  Phaser.Timer.HALF, "Linear", true).start();
      this.game.add.tween(helpBubbleBackground).to({
          alpha: 1
      },  Phaser.Timer.HALF, "Linear", true).start();
      this.game.add.tween(helpBubbleBackground.scale).to({
          x: 1,
          y: 1
      },  Phaser.Timer.HALF, "Linear", true).start();

      helpBubbleText.timer = this.game.time.create(this.game, true);

      helpBubbleText.timer.add(SHOW_TEXT_TIME * Phaser.Timer.SECOND, () => {
        this.game.add.tween(helpBubbleText).to({
            alpha: 0
        },  Phaser.Timer.HALF, "Linear", true).start();
        this.game.add.tween(helpBubbleText.scale).to({
            x: 0.1,
            y: 0.1
        },  Phaser.Timer.HALF, "Linear", true).start();
        this.game.add.tween(helpBubbleBackground).to({
            alpha: 0
        },  Phaser.Timer.HALF, "Linear", true).start();
        this.game.add.tween(helpBubbleBackground.scale).to({
            x: 0.1,
            y: 0.1
        },  Phaser.Timer.HALF, "Linear", true).start();
      });

      helpBubbleText.timer.start();
    }
  }

  getText() {
    return HELP_TEXT[this.textId];
  }
}
