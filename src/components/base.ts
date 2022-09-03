import type { Position } from "@app/type"

export interface IBaseComponent {
    draw: () => void
    update?: () => void
    getPosition: () => Position
}

export class BaseComponent implements IBaseComponent {
    protected position: Position

    protected ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D, position: Position) {
        this.ctx = ctx
        this.position = position
    }

    getPosition() {
        return this.position
    }

    draw() {
        throw Error('No component implementation')
    }
}