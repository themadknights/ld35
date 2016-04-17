import { Map }          from './map';
import { Hero }         from './hero.sprite';
import { AudioManager } from './audio.manager';

const GRAVITY_SPEED = 300;

export class MainState extends Phaser.State {
  init() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  create() {
    this.physics.arcade.gravity.y = GRAVITY_SPEED;
    //Creating background
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'village_background');
    this.background.sendToBack();
    this.background.fixedToCamera = true;
    this.cameraLastPositionX = this.camera.position.x;

    this.map = new Map(this, 'testLevel');
    this.hero = new Hero(this, this.game.world.centerX, this.game.world.centerY);
    this.enemies = this.game.add.group();

    this.audioManager = new AudioManager(this.game);
    this.audioManager.playMusic('music0');

    this.map.loadEntities();
    this.createHUD();
  }

  update() {
    this.game.physics.arcade.collide(this.hero, this.map.platforms);
    this.game.physics.arcade.collide(this.enemies, this.map.platforms);

    this.game.physics.arcade.overlap(this.hero, this.enemies, (hero, enemy) => {
      if (!hero.isSafeTransformedFor(enemy)) {
        this.restart();
      }
    });

    if (this.audioManager.isMuted()) {
      this.soundText.text = 'SOUND: NO';
    } else {
      this.soundText.text = 'SOUND: YES';
    }

    this.background.autoScroll((this.cameraLastPositionX - this.camera.position.x) * 20, 0);
    this.cameraLastPositionX = this.camera.position.x;
  }

  render() {
    //this.game.debug.body(this.hero);
  }

  restart() {
    this.game.state.start('main', true, false);
  }

  createHUD() {
    this.hud = this.game.add.group();
    this.hud.fixedToCamera = true;

    this.soundText = this.game.add.bitmapText(this.game.width - 10, 10, 'gameBoy', '', 12);
    this.soundText.anchor.setTo(1, 0);
    this.hud.add(this.soundText);

    this.hud.add(this.game.add.bitmapText(10, 10, 'gameBoy', 'Transformations:', 12));
    this.hud.add(this.game.add.bitmapText(10, 30, 'gameBoy', 'ONE: Woman', 12));
    this.hud.add(this.game.add.bitmapText(10, 50, 'gameBoy', 'TWO: Man', 12));
    this.hud.add(this.game.add.bitmapText(10, 70, 'gameBoy', 'THREE: Boy', 12));
  }
}
