import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import utils from './utils';

import GameObject from './game_object';

export default class Enemy extends GameObject {

  constructor(x, y) {

    super();

    this.tags = ['enemy'];

    this.x = x;
    this.y = y;
    this.path_index = 1;
    this.width = 16;
    this.height = 16;

    this.speed = 0.05;
    this.health = 6;

  }

  initialize(game) {
    this.path = game.getObjectsByTag('path')[0];
  }

  update(game, dt) {

    let move = this.speed * dt;

    let target = this.path.getStep(this.path_index);
    let distance = utils.distance(this.x, this.y, target.x, target.y);
    while(distance && distance < move) {
      move -= distance;
      this.x = target.x;
      this.y = target.y;
      target = this.path.getStep(++this.path_index);
      distance = target && utils.distance(this.x, this.y, target.x, target.y);
    }

    if(move && distance) {
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      this.x += (dx / distance) * move;
      this.y += (dy / distance) * move;
    }

    if(this.x - this.width / 2 > GAME_WIDTH ||
      this.x + this.width / 2 < 0 ||
      this.y - this.height / 2 > GAME_HEIGHT ||
      this.y + this.height / 2 < 0
    ) {
      game.removeObject(this);
    }

  }

  draw(context) {

    context.fillStyle = `rgb(0, 0, 0)`

		context.fillRect(
			this.x - this.width / 2,
			this.y - this.height / 2,
			this.width,
			this.height
		);

  }

  distance() {
    return this.path.remainingDistance(this.x, this.y, this.path_index);
  }

  takeDamage(game, damage) {
    this.health -= damage;
    if(this.health === 0) {
      game.removeObject(this);
    }
  }

}
