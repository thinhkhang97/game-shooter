import { ProjectTile } from "./project-tile"

export interface IPlayer {
    draw: () => void
    update?: () => void
}

export class BasePlayer implements IPlayer {
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
    }
}

export class MainPlayer extends BasePlayer {

    projectTile: ProjectTile[]

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
        super(ctx, x, y, radius, color)
        this.projectTile = []
        this.handleClick()
    }

    handleClick() {
        addEventListener('click', (event) => {
            const angle = Math.atan2(event.clientY - this.y, event.clientX - this.x)
            const velocityX = Math.cos(angle)
            const velocityY = Math.sin(angle)
            this.projectTile.push(new ProjectTile(this.ctx, this.x, this.y, 12, this.color, velocityX, velocityY))
        })
    }

    draw() {
        super.draw()
        this.projectTile.forEach(item => item.draw())
        this.update()
    }

    update() {
        this.projectTile.forEach(item => item.update())
    }
}

export class Enemy extends BasePlayer {
    velocity: number = 1

    update() {
        this.x += this.velocity
        this.y += this.velocity
    }
}