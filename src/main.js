
import Phaser from 'phaser'
import GameState from './states/Game'


class Game extends Phaser.Game {
    constructor () {
        super(window.innerWidth  , window.innerHeight , Phaser.CANVAS, 'content', null)
        this.state.add('Game', GameState, false)
        this.state.start('Game');
    }
}
window.game = new Game();


