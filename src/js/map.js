import { Villager }   from './enemies/villager.sprite';
import { Checkpoint } from './checkpoint.sprite';
import { HelpBubble } from './help_bubble';

export const TILE_SIZE = 64;

export class Map extends Phaser.Tilemap {
  constructor(state, levelId) {
    super(state.game, levelId);

    this.gameState = state;

    this.addTilesetImage('tileset');

    this.setCollisionBetween(1, 6);

    this.platforms = this.createLayer('foreground');
    this.platforms.resizeWorld();
    //this.platforms.debug = true;
  }

  loadEntities() {
    this.loadVillagers();
    this.loadHero();
    this.loadCheckpoints();
    this.loadHelp();
  }

  loadVillagers() {
    let villagersFirstgid = this.tilesets
      .filter(t => t.name === "villagers")[0].firstgid;

    this.forEachObject("npcs", "villager", (data) => {
      data.frame = data.gid - villagersFirstgid;
      this.gameState.enemies.add(new Villager(this.gameState, data));
    });
  }

  loadHero() {
    this.forEachObject("logic", "hero", (data) => {
      data.y += TILE_SIZE / 4;
      this.gameState.hero.position.setTo(data.x, data.y);
    });
  }

  loadCheckpoints() {
    this.forEachObject("logic", "checkpoint", (data) => {
      data.y += TILE_SIZE / 4;
      this.gameState.checkpoints.add(new Checkpoint(this.gameState, data));
    });
  }

  loadHelp() {
    this.forEachObject("help", "help", (data) => {
      this.gameState.helpBubbles.add(new HelpBubble(this.gameState, data));
    });
  }

  forEachObject(groupId, objectType, cb) {
    if (this.objects && this.objects[groupId]) {
      for(let data of this.objects[groupId]) {
        if(data.type === objectType) {
          data.x += TILE_SIZE / 2;
          data.y -= TILE_SIZE / 2;
          cb(data);
        }
      }
    }
  }
}
