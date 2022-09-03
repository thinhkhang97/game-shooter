import { BaseComponent, IBaseComponent } from "@app/components";
import type { Position, Velocity } from "@app/type";


export interface IProjectTile extends IBaseComponent {
    getVelocity: () => Velocity
}

export class ClassicProjectTile extends BaseComponent implements IProjectTile {
    private velocity: Velocity

    private color: string = 'blue'

    private size: number = 24

    private speed: number = 10

    constructor(ctx: CanvasRenderingContext2D, position: Position, velocity: Velocity) {
        super(ctx, { ...position })
        this.velocity = { ...velocity }
    }

    getVelocity() {
        return this.velocity
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.update()
    }

    update() {
        this.position.x += this.velocity.x * this.speed
        this.position.y += this.velocity.y * this.speed
    }
}