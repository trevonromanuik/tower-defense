import Game from './game';

const canvas = document.getElementById('canvas');
const game = new Game(canvas);
game.run();