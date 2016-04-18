import { Map }          from './map';
import { Hero }         from './hero.sprite';
import { AudioManager } from './audio.manager';

const GRAVITY_SPEED = 300;

export class MainState extends Phaser.State {
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

    this.map = new Map(this, 'testLevel');
    this.hero = new Hero(this, this.game.world.centerX, this.game.world.centerY);
    this.enemies = this.game.add.group();
    this.checkpoints = this.game.add.group();

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

    for (let i = 0; i < this.healthIcons.length; i += 1) {
      if (i < this.hero.health) {
        this.healthIcons[i].frame = 0;
      } else {
        this.healthIcons[i].frame = 1;
      }
    }

    this.background.autoScroll((this.cameraLastPositionX - this.camera.position.x) * 20, 0);
    this.cameraLastPositionX = this.camera.position.x;
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

  restart() {
    this.cameraOverlayTween = this.game.add.tween(this.cameraOverlay).to({
        alpha: 1
    },  Phaser.Timer.HALF, "Linear", true);
    this.cameraOverlayTween.onComplete.add(() => {
      this.game.state.start('main', true, false, this.savePosition);
    });
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

    this.transformationBar = this.game.add.sprite(40, this.game.height / 2, 'transformationHud');
    this.transformationBar.anchor.setTo(0.5);
    this.transformationBar.alpha = 0.9;
    this.hud.add(this.transformationBar);


    this.cameraOverlay = this.game.add.image(0, 0, 'cameraOverlay');
    this.cameraOverlay.alpha = 1;
    this.cameraOverlay.fixedToCamera = true;
  }
}
