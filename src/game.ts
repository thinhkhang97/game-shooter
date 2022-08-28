import { WINDOW } from './config'
import { BasePlayer, Enemy, MainPlayer } from './components'

export class Game {
    private ctx: CanvasRenderingContext2D

    private player: MainPlayer

    private enemies: Enemy[]

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.player = new MainPlayer(this.ctx, WINDOW.width / 2, WINDOW.height / 2, 40, 'blue')
        this.enemies = [new Enemy(this.ctx, WINDOW.width / 2, WINDOW.height / 2, 40, 'red')]
    }

    start() {
        const animation = () => {
            requestAnimationFrame(animation)
            this.draw()
        }
        animation()
    }

    draw() {
        this.ctx.clearRect(0, 0, WINDOW.width, WINDOW.height)
        this.player.draw()

        // this.enemies.forEach(item => {
        //     item.draw()
        //     item.update()
        // })
    }
}


