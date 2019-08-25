import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import GameObject from './game_object';
import MapImage from './map.png'

export default class Map extends GameObject {

  constructor() {

    super();

    this.tags = ['map'];

    this.map_image = new Image();
    this.map_image.src = MapImage;

  }

  update(game, dt) {



  }

  draw(ctx) {
    ctx.drawImage(this.map_image, 0, 0);
  }

}
