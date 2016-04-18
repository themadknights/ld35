import { Map, TILE_SIZE } from './map';
import { Hero }           from './hero.sprite';
import { AudioManager }   from './audio.manager';

const GRAVITY_SPEED = 300;

export class InstructionsState extends Phaser.State {
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

    this.map = new Map(this, 'instructionsLevel');
    this.hero = new Hero(this, this.game.world.centerX, this.game.world.centerY);
    this.hero.godMode = true;
    this.enemies = this.game.add.group();
    this.checkpoints = this.game.add.group();
    this.helpBubbles = this.game.add.group();

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
    this.game.physics.arcade.collide(this.enemies, this.map.platforms);
    this.game.physics.arcade.collide(this.checkpoints, this.map.platforms);

    this.game.physics.arcade.overlap(this.hero, this.helpBubbles, (hero, helpBubble) => {
      helpBubble.activate();
    });

    this.game.physics.arcade.overlap(this.hero, this.checkpoints, (hero, checkpoint) => {
      this.checkpoints.forEach(c => {
        if (c !== checkpoint) {
          c.deActivate();
        }
      });
      checkpoint.activate();
    });

    this.game.physics.arcade.overlap(this.hero, this.enemies, (hero, enemy) => {
      if (!hero.isSafeTransformedFor(enemy)) {
        this.hero.damage();
      }
    });

    if (this.audioManager.isMuted()) {
      this.soundIcon.frame = 1;
    } else {
      this.soundIcon.frame = 0;
    }

    this.background.autoScroll((this.cameraLastPositionX - this.camera.position.x) * 20, 0);
    this.cameraLastPositionX = this.camera.position.x;

    if (this.hero.position.x > this.world.width) {
      this.game.state.start('start', true, false, { x: TILE_SIZE / 2, y: this.game.height - TILE_SIZE * 1.25 });
    } else if (this.hero.position.y > this.game.height) {
      this.hero.die();
    }
  }

  render() {
    //this.helpBubbles.forEach(bubble => this.game.debug.body(bubble));
  }

  start() {
    this.cameraOverlayTween = this.game.add.tween(this.cameraOverlay).to({
        alpha: 0
    },  Phaser.Timer.HALF, "Linear", true);
    this.cameraOverlayTween.start();
  }

  restart() {
    this.cameraOverlayTween = this.game.add.tween(this.cameraOverlay).to({
        alpha: 1
    },  Phaser.Timer.HALF, "Linear", true);
    this.cameraOverlayTween.onComplete.add(() => {
      this.game.state.start('instructions', true, false, this.savePosition);
    });
    this.cameraOverlayTween.start();
  }

  createHUD() {
    this.hud = this.game.add.group();
    this.hud.fixedToCamera = true;

    this.soundIcon = this.game.add.sprite(this.game.width - 10, 10, 'soundIcon');
    this.soundIcon.anchor.setTo(1, 0);
    this.hud.add(this.soundIcon);

    this.transformationBar = this.game.add.sprite(40, this.game.height / 2, 'transformationHud');
    this.transformationBar.anchor.setTo(0.5);
    this.transformationBar.alpha = 0;
    this.hud.add(this.transformationBar);

    this.helpBubbleBackground = this.game.add.image(this.game.width / 2, this.game.height / 2 - 100, 'helpBubbleBackground');
    this.helpBubbleBackground.anchor.setTo(0.5);
    this.helpBubbleBackground.alpha = 0;
    this.hud.add(this.helpBubbleBackground);

    this.helpBubbleText = this.game.add.bitmapText(this.game.width / 2 - 15, this.game.height / 2 - 100, 'gameBoy', '', 16);
    this.helpBubbleText.anchor.setTo(0.5);
    this.helpBubbleText.alpha = 0;
    this.hud.add(this.helpBubbleText);

    this.cameraOverlay = this.game.add.image(0, 0, 'cameraOverlay');
    this.cameraOverlay.alpha = 1;
    this.cameraOverlay.fixedToCamera = true;
  }
}
