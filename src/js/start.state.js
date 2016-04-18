import { Map }          from './map';
import { Hero }         from './hero.sprite';
import { AudioManager } from './audio.manager';

const GRAVITY_SPEED = 300;

export class StartState extends Phaser.State {
  init(savePosition) {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.savePosition = savePosition;
  }

  create() {
    this.physics.arcade.gravity.y = GRAVITY_SPEED;

    //Creating background
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'dungeon_background');
    this.background.sendToBack();
    this.background.fixedToCamera = true;
    this.cameraLastPositionX = this.camera.position.x;

    this.map = new Map(this, 'startLevel');
    this.hero = new Hero(this, this.game.world.centerX, this.game.world.centerY);

    this.audioManager = new AudioManager(this.game);
    this.audioManager.playMusic('music0');

    this.map.loadEntities();

    if (this.savePosition) {
      this.hero.position.copyFrom(this.savePosition);
    }
    this.createHUD();
    this.start();
  }

  update() {
    this.game.physics.arcade.collide(this.hero, this.map.platforms);

    if (this.audioManager.isMuted()) {
      this.soundIcon.frame = 1;
    } else {
      this.soundIcon.frame = 0;
    }

    if (this.hero.position.x < 0) {
      this.game.state.start('instructions', true, false);
    } else if (this.hero.position.x > this.world.width) {
      this.game.state.start('main', true, false);
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

    this.healthIcons = [];
    for(let i = 0; i < this.hero.maxHealth; i += 1) {
      let healthIcon = this.game.add.sprite(10 + i * 32 + i * 5, 10, 'healthIcon');

      this.healthIcons.push(healthIcon);
      this.hud.add(healthIcon);
    }

    this.cameraOverlay = this.game.add.image(0, 0, 'cameraOverlay');
    this.cameraOverlay.alpha = 1;
    this.cameraOverlay.fixedToCamera = true;
  }
}
