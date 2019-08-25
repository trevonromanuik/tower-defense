import utils from './utils';
import GameObject from './game_object';

export default class Bullet extends GameObject {

  constructor(x, y, target) {

    super();

    this.tags = ['bullet'];

    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.target = target;

    this.speed = 0.25;

  }

  update(game, dt) {

    const distance = utils.distance(this.x, this.y, this.target.x, this.target.y);
    if(distance < 8) {
      this.target.takeDamage(game, 1);
      game.removeObject(this);
      return;
    }

    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;

    this.x += (dx / distance) * this.speed * dt;
    this.y += (dy / distance) * this.speed * dt;

  }

  draw(ctx) {
    ctx.fillStyle = `darkgrey`
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

}
