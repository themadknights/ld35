import { Map, TILE_SIZE } from './map';
import { Hero }           from './hero.sprite';
import { AudioManager }   from './audio.manager';

import { FG_COLOR }     from './constants';

const GRAVITY_SPEED = 300;

export class GameOverState extends Phaser.State {
  init(savePosition) {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.savePosition = savePosition;
  }

  create() {
    this.physics.arcade.gravity.y = GRAVITY_SPEED;

    //Creating background
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'game_over_background');
    this.background.sendToBack();
    this.background.fixedToCamera = true;
    this.cameraLastPositionX = this.camera.position.x;

    this.map = new Map(this, 'startLevel');
    this.hero = new Hero(this, this.game.world.centerX, this.game.world.centerY);

    this.heroWife = this.game.add.sprite(220, this.world.height - TILE_SIZE * 1.25, 'hero', 2);
    this.heroWife.animations.add('slime', [2, 3], 6, true);
    this.heroWife.play('slime');
    this.heroWife.anchor.setTo(0.5);

    this.heroChild1 = this.game.add.sprite(250, this.world.height - TILE_SIZE * 1.25, 'hero', 4);
    this.heroChild1.animations.add('slime', [4, 5], 6, true);
    this.heroChild1.play('slime');
    this.heroChild1.anchor.setTo(0.5);

    this.heroChild2 = this.game.add.sprite(180, this.world.height - TILE_SIZE * 1.25, 'hero', 4);
    this.heroChild2.animations.add('slime', [4, 5], 6, true);
    this.heroChild2.play('slime');
    this.heroChild2.anchor.setTo(0.5);

    this.audioManager = new AudioManager(this.game);
    this.audioManager.playMusic('music0');

    this.map.loadEntities();

    if (this.savePosition) {
      this.hero.position.copyFrom(this.savePosition);
    }
    this.createHUD();
    this.start();
    this.hero.body.collideWorldBounds = true;
  }

  update() {
    this.game.physics.arcade.collide(this.hero, this.map.platforms);

    if (this.audioManager.isMuted()) {
      this.soundIcon.frame = 1;
    } else {
      this.soundIcon.frame = 0;
    }
  }

  render() {
    //this.game.debug.body(this.hero);
  }

  start() {
    this.cameraOverlayTween = this.game.add.tween(this.cameraOverlay).to({
        alpha: 0
    },  Phaser.Timer.HALF, "Linear", true);
    this.cameraOverlayTween.start();
  }

  createHUD() {
    this.hud = this.game.add.group();
    this.hud.fixedToCamera = true;

    this.soundIcon = this.game.add.sprite(this.game.width - 10, 10, 'soundIcon');
    this.soundIcon.anchor.setTo(1, 0);
    this.hud.add(this.soundIcon);

    this.thanksText = this.game.add.bitmapText(this.game.width / 2, 100, 'gameBoy', "Thanks for playing!", 30);
    this.thanksText.anchor.setTo(0.5);
    this.hud.add(this.thanksText);

    this.awesomeText = this.game.add.bitmapText(this.game.width / 2, 350, 'gameBoy', "You are awesome!", 30);
    this.awesomeText.anchor.setTo(0.5);
    this.hud.add(this.awesomeText);

    this.cameraOverlay = this.game.add.image(0, 0, 'cameraOverlay');
    this.cameraOverlay.alpha = 1;
    this.cameraOverlay.fixedToCamera = true;
  }
}
