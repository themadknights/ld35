export const TILE_SIZE = 64;

import { Villager } from './villager.sprite';

export class Map extends Phaser.Tilemap {
  constructor(state, levelId) {
    super(state.game, levelId);

    this.gameState = state;

    this.addTilesetImage('tileset');

    this.setCollisionBetween(1, 3);

    this.platforms = this.createLayer('foreground');
    this.platforms.resizeWorld();
    //this.platforms.debug = true;
    
    this.loadVillagers();
    this.loadHero();
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
      this.gameState.hero.position.setTo(data.x, data.y);
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
