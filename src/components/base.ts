import type { Position } from "@app/type"
import { v4 as uuidv4 } from 'uuid';

export interface IBaseComponent {
    draw: () => void
    update?: () => void
    getPosition: () => Position
    getId: () => void
}

export class BaseComponent implements IBaseComponent {
    protected id: string

    protected position: Position

    protected ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D, position: Position) {
        this.ctx = ctx
        this.position = position
        this.id = uuidv4()
    }

    getPosition() {
        return this.position
    }

    getId() {
        return this.id
    }

    draw() {
        throw Error('No component implementation')
    }
}