import utils from './utils';
import GameObject from './game_object';
import Bullet from './bullet';
import Cooldown from './cooldown';

export default class Tower extends GameObject {

	constructor(x, y) {

		super();

		this.tags = ['tower'];

		this.x = x;
		this.y = y;
		this.width = 32;
		this.height = 32;
		this.current_target = null;
		this.fire_cooldown = new Cooldown(1000);
		this.range = 100;

	}

	update(game, dt) {

		this.applyFireCooldown(dt);

		if(this.canFire()) {
			const target = this.getTarget(game);
			if(target) {
				this.fire(game, target);
			}
		}

	}

	draw(context) {

		context.fillStyle = 'yellow';
		context.globalAlpha = 0.5;
		context.beginPath();
		context.ellipse(
			this.x,
			this.y,
			this.range,
			this.range,
			0,
			0,
			2 * Math.PI
		);
		context.fill();
		context.globalAlpha = 1.0;

		const ratio = this.fire_cooldown.remaining / this.fire_cooldown.cooldown;
		const red = (1 - ratio) * 255;
		const blue = ratio * 255;

		context.fillStyle = `rgb(${red}, 0, ${blue})`

		context.fillRect(
			this.x - this.width / 2,
			this.y - this.height / 2,
			this.width,
			this.height
		);

	}

	applyFireCooldown(dt) {
		this.fire_cooldown.applyCooldown(dt);
	}

	canFire(dt) {
		return this.fire_cooldown.isReady();
	}

	fire(game, target) {
		game.addObject(new Bullet(this.x, this.y, target));
		this.fire_cooldown.trigger();
	}

	getTarget(game) {
		return game.getObjectsByTag('enemy').filter((enemy) => {
			return utils.distance(this.x, this.y, enemy.x, enemy.y) <= this.range;
		}).sort((enemy_a, enemy_b) => {
			return enemy_a.distance() < enemy_b.distance();
		})[0];
	}

}
