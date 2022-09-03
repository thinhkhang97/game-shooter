import { BaseComponent } from "@app/components"
import { WINDOW } from "@app/config"
import type { Position } from "@app/type"
import { getRandomColor } from "@app/utils"

export interface IEnemy {
    draw: () => void

    getVelocity: () => Position

    setVelocity: (v: Position) => void
}

const MIN_RADIUS = 16

const MAX_RADIUS = 80


const BORDER_PADDING = 160
const BORDER_START_X = WINDOW.width / 2 - BORDER_PADDING
const BORDER_END_X = WINDOW.width / 2 + BORDER_PADDING
const BORDER_START_Y = WINDOW.height / 2 - BORDER_PADDING
const BORDER_END_Y = WINDOW.height / 2 + BORDER_PADDING

export class ClassicEnemy extends BaseComponent implements IEnemy {
    private radius = 48

    private color = 'red'

    private velocity = { x: 0, y: 0 }

    constructor(ctx: CanvasRenderingContext2D) {
        let randomX = Math.random() * WINDOW.width
        let randomY = Math.random() * WINDOW.height

        const position = {
            x: randomX > BORDER_START_X && randomX < BORDER_END_X ? BORDER_START_X : randomX,
            y: randomY > BORDER_START_Y && randomY < BORDER_END_Y ? BORDER_START_Y : randomY,
        }
        super(ctx, position)
        this.radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS
        this.color = getRandomColor()
    }

    getVelocity() {
        return this.velocity
    }

    setVelocity(value: Position) {
        this.velocity = { ...value }
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        this.ctx.fillStyle = this.color
        this.ctx.fill()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}