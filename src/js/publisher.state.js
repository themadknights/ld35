import { FG_COLOR } from './constants';

export class PublisherState extends Phaser.State {
  constructor() {
    super();
  }

  create() {
    this.publisherGroup = this.game.add.group();
    this.publisherGroup.alpha = 0;
    this.publisherGroup.fixedToCamera = true;

    this.publisherLogo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'tmkLogo');
    this.publisherLogo.anchor.setTo(0.5);
    this.publisherText = this.game.add.bitmapText(this.game.world.centerX, 
        this.game.world.centerY + this.publisherLogo.height / 2 + 20, 'gameBoy', "THE MAD KNIGHTS", 24);
    this.publisherText.tint = FG_COLOR;
    this.publisherText.anchor.setTo(0.5);

    this.publisherGroup.add(this.publisherLogo);
    this.publisherGroup.add(this.publisherText);

    let tween = this.game.add.tween(this.publisherGroup).to( { alpha: 1 }, 1000, "Linear", true, 0, 0);
    tween.yoyo(true, 1000);

    tween.onComplete.add(() => {
      this.game.state.start('start');
    });
  }
}
