export class AudioManager {
  constructor(game) {
    this.game = game;
    this.sounds = {};
    this.music = null;
    this.game.sound.mute = process.env.NODE_ENV === 'production' ? false : true;

    this.toggleMuteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.toggleMuteKey.onDown.add(this.toggleMute, this);
  }

  playMusic(music) {
    this.game.sound.stopAll();
    this.music = this.game.add.audio(music, 0.05, true);
    this.music.play();
  }

  playFx(fx) {
    if (!this.sounds[fx]) {
      this.sounds[fx] = this.game.add.audio(fx);
      this.sounds[fx].volume = 0.1;
    }
    this.sounds[fx].play();
  }

  toggleMute() {
    this.game.sound.mute = !this.game.sound.mute;
  }

  isMuted() {
    return this.game.sound.mute;
  }
}
