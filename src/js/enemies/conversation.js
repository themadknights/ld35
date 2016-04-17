import { WOMAN_FRAME, MAN_FRAME, BOY_FRAME } from './villager.sprite';

const SECONDS_TALKING = 3;

export class Conversation {
  constructor(villager1, villager2) {
    this.villager1 = villager1;
    this.villager2 = villager2;

    this.villager1.startTalking();
    this.villager2.startTalking();

    this.game = this.villager1.game;

    this.turns = [
      { actor: villager1, action: 'like', about: 'woman'},
      { actor: villager2, action: 'like', about: 'man'},
      //{ actor: villager1, action: 'dislike', about: 'boy'},
      //{ actor: villager2, action: 'disklike', about: 'man'},
      //{ actor: villager1, action: 'like', about: 'boy'},
      //{ actor: villager2, action: 'dislike', about: 'woman'}
    ];

    this.scheduleNextTurn();
  }

  scheduleNextTurn() {
    if (this.turns.length > 0) {
      let currentTurn = this.turns.shift();
      let timer = this.game.time.create(this.game, true);

      this.villager1.comic.visible = false;
      this.villager2.comic.visible = false;

      currentTurn.actor.comic.frame = currentTurn.action === 'like' ? 0 : 1;
      currentTurn.actor.talkingAbout.frame = this.getConversationFrame(currentTurn.about);
      currentTurn.actor.comic.visible = true;

      timer.add(SECONDS_TALKING * Phaser.Timer.SECOND, () => {
        this.scheduleNextTurn();
      });

      timer.start();
    } else {
      this.villager1.stopTalking();
      this.villager2.stopTalking();
    }
  }

  getConversationFrame(about) {
    switch(about) {
      case "woman":
        return WOMAN_FRAME;
      case "man":
        return MAN_FRAME;
      case "boy":
        return BOY_FRAME;
    }
  }
}
