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
    
    let villagersFirstgid = this.tilesets
      .filter(t => t.name === "villagers")[0].firstgid;

    if (this.objects && this.objects.npcs) {
      for(let npc of this.objects.npcs) {
        switch(npc.type) {
          case "villager":
            npc.frame = npc.gid - villagersFirstgid;
            npc.x += TILE_SIZE / 2;
            npc.y -= TILE_SIZE / 2;
            this.gameState.enemies.add(new Villager(this.gameState, npc));
            break;
        }
      }
    }
  }
}
