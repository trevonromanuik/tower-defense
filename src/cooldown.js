export default class Cooldown {

  constructor(cooldown) {
    this.cooldown = cooldown;
    this.remaining = 0;
  }

  applyCooldown(dt) {
    this.remaining = Math.max(this.remaining - dt, 0);
  }

  isReady() {
    return this.remaining === 0;
  }

  trigger() {
    this.remaining = this.cooldown;
  }

}
