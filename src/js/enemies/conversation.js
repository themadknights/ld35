import { WOMAN_FRAME, MAN_FRAME, BOY_FRAME } from './villager.sprite';

const SECONDS_TALKING = 2;
const SECONDS_PAUSE = 0.5;

function shuffle(a) {
  var j, x, i;

  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }

  return a;
}

export class Conversation {
  constructor(villager1, villager2) {
    this.villager1 = villager1;
    this.villager2 = villager2;

    this.villager1.startTalking();
    this.villager2.startTalking();

    this.game = this.villager1.game;

    this.turns = [];

    this.buildTurns();
    this.scheduleNextTurn();
  }

  buildTurns() {
    this.turns = shuffle([
      ...this.buildVillagerTurns(this.villager1),
      ...this.buildVillagerTurns(this.villager2)
    ]);
  }

  buildVillagerTurns(villager) {
    return [
      ...villager.likes.map(like => {
        return {actor: villager, action: 'like', about: like}
      }),
    ...this.villager1.dislikes.map(dislike => {
      return {actor: villager, action: 'dislike', about: dislike}
    })
    ];
  }

  scheduleNextTurn() {
    if (this.turns.length > 0) {
      let currentTurn = this.turns.shift();
      let timer = this.game.time.create(this.game, true);

      this.villager1.comic.visible = false;
      this.villager2.comic.visible = false;

      if (currentTurn.actor === this.villager1 && !this.villager2.talking) {
        this.villager1.stopTalking();
      } else if (currentTurn.actor === this.villager2 && !this.villager1.talking) {
        this.villager2.stopTalking();
      } else {
        currentTurn.actor.comic.frame = currentTurn.action === 'like' ? 0 : 1;
        currentTurn.actor.talkingAbout.frame = Conversation.getConversationFrame(currentTurn.about);
        currentTurn.actor.comic.visible = true;
        currentTurn.actor.play('talk');

        timer.add(SECONDS_TALKING * Phaser.Timer.SECOND, () => {
          let timer = this.game.time.create(this.game, true);
          currentTurn.actor.comic.visible = false;
          currentTurn.actor.animations.stop('talk');
          currentTurn.actor.frame = currentTurn.actor.initialFrame;

          timer.add(SECONDS_PAUSE * Phaser.Timer.SECOND, () => {
            this.scheduleNextTurn();
          });

          timer.start();
        });

        timer.start();
      }
    } else {
      this.villager1.stopTalking();
      this.villager2.stopTalking();
    }
  }

  static getConversationFrame(about) {
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
