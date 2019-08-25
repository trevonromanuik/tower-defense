import GameObject from './game_object';
import Enemy from './enemy';
import Cooldown from './cooldown';

export default class EnemySpawner extends GameObject {

  constructor() {

    super();

    this.tags = ['enemy_spawner'];

    this.x = 304;
    this.y = 480;

    this.spawn_cooldown = new Cooldown(5000);

  }

  update(game, dt) {

    this.applySpawnCooldown(dt);

    if(this.canSpawn()) {
      this.spawn(game);
    }


  }

  draw(context) {

  }

  applySpawnCooldown(dt) {
    this.spawn_cooldown.applyCooldown(dt);
  }

  canSpawn() {
    return this.spawn_cooldown.isReady();
  }

  spawn(game) {
    game.addObject(new Enemy(this.x, this.y));
    this.spawn_cooldown.trigger();
  }

}
