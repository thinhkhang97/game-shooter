export interface IBaseComponent {
    draw: () => void
    update?: () => void
}

export class BaseComponent {
    x: number
    y: number
    ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx,
            this.x = x
        this.y = y
    }
}