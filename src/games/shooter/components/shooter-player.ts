import { BaseComponent, IBaseComponent } from "@app/components";
import type { Position } from "@app/type";
import type { IPlayerGun } from "./player-gun";
import type { IProjectTile } from "./project-tile";

export interface IShooterPlayer extends IBaseComponent {
    getRadius: () => number

    getColor: () => string

    getPlayerProjectTile: () => IProjectTile[]
}

export class ClassicShooterPlayer extends BaseComponent implements IShooterPlayer {

    private radius = 64

    private color = 'blue'

    private playerGun: IPlayerGun

    constructor(ctx: CanvasRenderingContext2D, pos: Position, playerGun: IPlayerGun) {
        super(ctx, { ...pos })
        this.playerGun = playerGun
        this.playerGun.initProjectTile()
    }

    getColor() {
        return this.color
    }

    getRadius() {
        return this.radius
    }

    draw(): void {
        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
    }

    getPlayerProjectTile() {
        return this.playerGun.getProjectTiles()
    }
}