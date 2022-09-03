import type { Position } from "@app/type";
import { ClassicEnemy, IEnemy } from "./enemy";

export interface IEnemyFactory {
    spawnEnemy: () => void

    getEnemy: () => IEnemy[]
}

export class ClassicEnemyFactory implements IEnemyFactory {
    ctx: CanvasRenderingContext2D

    playerPosition: Position

    private enemies: IEnemy[] = []

    constructor(ctx: CanvasRenderingContext2D, playerPosition: Position) {
        this.ctx = ctx
        this.playerPosition = { ...playerPosition }
    }

    spawnEnemy() {
        setInterval(() => {
            const newEnemy = new ClassicEnemy(this.ctx)
            const enemyPosition = newEnemy.getPosition()
            const angle = Math.atan2(this.playerPosition.y - enemyPosition.y, this.playerPosition.x - enemyPosition.x)
            newEnemy.setVelocity({
                x: Math.cos(angle),
                y: Math.sin(angle)
            })
            this.enemies.push(newEnemy)
        }, 1000)
    }

    getEnemy() {
        return this.enemies
    }
}