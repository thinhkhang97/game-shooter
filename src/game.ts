import { DEFAULT_CONFIG } from './config'

const canvas = window.document.getElementById("main-canvas") as HTMLCanvasElement
canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    radius: number
    color: string

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()

        console.log("DEFAULT CONFIG", DEFAULT_CONFIG)
    }
}

class Game {
    private ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    start() {
        const newPlayer = new Player(this.ctx, 100, 100, 150, 'blue')
        newPlayer.draw()
    }
}

const ctx = canvas.getContext('2d')
if (ctx) {
    (new Game(ctx)).start()
}


