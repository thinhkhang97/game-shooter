import { BaseComponent, IBaseComponent } from "@app/components";
import type { Position, Velocity } from "@app/type";

export interface IParticle extends IBaseComponent {
    getAlpha: () => number

    getRadius: () => number
}

export class ClassicParticle extends BaseComponent implements IParticle {
    private radius = 6

    private color: string

    private velocity: Velocity

    private alpha = 1

    constructor(ctx: CanvasRenderingContext2D, position: Position, color: string, velocity: Velocity) {
        super(ctx, { ...position })
        this.color = color
        this.velocity = { ...velocity }
    }

    getAlpha() {
        return this.alpha
    }

    getRadius() {
        return this.radius
    }

    draw() {
        if (this.alpha >= 0.01 && this.radius > 0) {
            this.ctx.save() // Save default alpha
            this.ctx.globalAlpha = this.alpha
            this.ctx.beginPath()
            this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
            this.ctx.fillStyle = this.color
            this.ctx.fill()
            this.ctx.restore() // Restore alpha value
        }


        this.alpha -= 0.01
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.radius -= 0.1
    }
}

