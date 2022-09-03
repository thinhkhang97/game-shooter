export interface IGame {
    start: () => void
}

export abstract class Game implements IGame {
    ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    start() {
        throw Error('No game implementation')
    }
}