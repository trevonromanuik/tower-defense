import { GAME_WIDTH, GAME_HEIGHT } from './constants';

import Map from './map';
import Path from './path';
import Tower from './tower';
import EnemySpawner from './enemy_spawner';

export default class Game {

	constructor(canvas) {

		this.id = 0;
		this.game_objects_id_map = {};
		this.game_objects_tag_map = {};

		this.last_frame = null;

		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.canvas.width = GAME_WIDTH;
		this.canvas.height = GAME_HEIGHT;

		this.addObject(new Map());
		this.addObject(new Path());
		this.addObject(new Tower(470, 240));
		this.addObject(new Tower(190, 300));
		this.addObject(new EnemySpawner());

	}

	addObject(object) {

		object.id = this.id++;
		if(object.initialize) object.initialize(this);
		this.game_objects_id_map[object.id] = object;

		object.tags.forEach((tag) => {
			if(!this.game_objects_tag_map[tag]) {
				this.game_objects_tag_map[tag] = [];
			}
			this.game_objects_tag_map[tag].push(object);
		});

	}

	getObjectsByTag(tag) {
		return this.game_objects_tag_map[tag] || [];
	}

	removeObject(object) {

		delete this.game_objects_id_map[object.id];

		if(object && object.tags) {
			object.tags.forEach((tag) => {
				const index = this.game_objects_tag_map[tag].indexOf(object);
				if(index > -1) this.game_objects_tag_map[tag].splice(index, 1);
			});
		}

	}

	run() {
		this.last_frame = Date.now();
		this.loop();
	}

	loop() {
		const now = Date.now();
		this.update();
		this.draw();
		setTimeout(() => {
			this.loop();
		}, Math.max(0, 33 - (Date.now() - now)));
	}

	update() {

		const this_frame = Date.now();
		const dt = this_frame - this.last_frame;
		this.last_frame = this_frame;

		Object.keys(this.game_objects_id_map).forEach((id) => {
			this.game_objects_id_map[id].update(this, dt);
		});

	}

	draw() {

		this.context.fillStyle = 'lightgrey';
		this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

		Object.keys(this.game_objects_id_map).forEach((id) => {
			this.game_objects_id_map[id].draw(this.context);
		});

	}

}
