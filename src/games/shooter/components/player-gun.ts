import { BaseComponent } from "@app/components"
import type { Position } from "@app/type"
import { ClassicProjectTile, IProjectTile } from "./project-tile"

export interface IPlayerGun {
    initProjectTile: () => void

    getProjectTiles: () => IProjectTile[]
}

export class ClassicPlayerGun extends BaseComponent implements IPlayerGun {

    private projectTiles: IProjectTile[] = []

    constructor(ctx: CanvasRenderingContext2D, playerPos: Position) {
        super(ctx, { ...playerPos })
    }

    initProjectTile() {
        addEventListener('click', (event) => {
            const angle = Math.atan2(event.clientY - this.position.y, event.clientX - this.position.y)
            const velocityX = Math.cos(angle)
            const velocityY = Math.sin(angle)
            this.projectTiles.push(new ClassicProjectTile(this.ctx, this.position, { x: velocityX, y: velocityY }))
        })
    }

    getProjectTiles() {
        return this.projectTiles
    }

}