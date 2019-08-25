import utils from './utils';
import GameObject from './game_object';

export default class Path extends GameObject {

  constructor() {

    super();

    this.tags = ['path'];

    this.steps = [
      [304, 480],
      [311, 430],
      [176, 394],
      [113, 314],
      [118, 264],
      [218, 224],
      [324, 240],
      [374, 274],
      [449, 304],
      [518, 295],
      [544, 245],
      [516, 186],
      [441, 122],
      [344, 89],
      [308, 51],
      [300, -16]
    ];

    this.distances = [];
    for(let i = 1; i < this.steps.length; i++) {
      this.distances.push(
        utils.distance(
          this.steps[i - 1][0],
          this.steps[i - 1][1],
          this.steps[i][0],
          this.steps[i][1]
        )
      );
    }

  }

  remainingDistance(x, y, index) {

    let distance = utils.distance(
      x, y,
      this.steps[index][0], this.steps[index][1]
    );

    for(let i = index; i < this.distances.length; i++) {
      distance += this.distances[i];
    }

  }

  getStep(index) {
    const [x, y] = this.steps[index];
    return { x, y };
  }

  update(game, dt) {

  }

  draw(ctx) {

  }

}
