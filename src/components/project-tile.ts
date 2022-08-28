import { IBaseComponent, BaseComponent } from "./base";

export interface IProjectTile extends IBaseComponent {
}

export class ProjectTile extends BaseComponent implements IProjectTile {
    private speed: number = 10

    color: string = 'blue'
    size: number
    velocityX: number
    velocityY: number

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, velocityX: number, velocityY: number) {
        super(ctx, x, y)
        this.size = size
        this.color = color
        this.velocityX = velocityX
        this.velocityY = velocityY
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
    }

    update() {
        this.x += this.velocityX * this.speed
        this.y += this.velocityY * this.speed
    }
}