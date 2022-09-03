import { WINDOW } from "@app/config";
import { Game } from "@app/game";
import { ClassicPlayerGun, ClassicShooterPlayer, IEnemy, IProjectTile, IShooterPlayer } from "./components";
import { ClassicEnemyFactory, IEnemyFactory } from "./components/enemy-factory";
import _ from 'lodash'
import { getDistance } from "@app/utils";

export class Shooter extends Game {
    private requestAnimationId?: number

    private mainPlayer: IShooterPlayer

    private enemyFactory: IEnemyFactory

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
        const playerPostition = { x: WINDOW.width / 2, y: WINDOW.height / 2 }
        const playerGun = new ClassicPlayerGun(this.ctx, playerPostition)
        this.mainPlayer = new ClassicShooterPlayer(this.ctx, playerPostition, playerGun)
        this.enemyFactory = new ClassicEnemyFactory(this.ctx, playerPostition)
        this.initGame()

    }

    initGame() {
        this.ctx.canvas.style.backgroundColor = "black"
        this.enemyFactory.spawnEnemy()
    }

    handleCollision() {
        // Project tile and enemy
        const enemies = this.enemyFactory.getEnemy()
        const projectTile = this.mainPlayer.getPlayerProjectTile()

        enemies.forEach((enemy) => {
            const enemyPos = enemy.getPosition()
            projectTile.forEach((tile, tileIndex) => {
                const tilePos = tile.getPosition()
                const distance = getDistance(enemyPos, tilePos)

                if (distance < enemy.getRadius() + tile.getSize()) {
                    enemy.setRadius(enemy.getRadius() - 30)
                    projectTile.splice(tileIndex, 1)
                }
            })

            const distanceWithPlayer = getDistance(enemy.getPosition(), this.mainPlayer.getPosition())
            if (distanceWithPlayer < enemy.getRadius() + this.mainPlayer.getRadius() && this.requestAnimationId) {
                // End game
                cancelAnimationFrame(this.requestAnimationId)
            }
        })

        enemies.forEach((item, index) => {
            if (item.getRadius() < 16) {
                enemies.splice(index, 1)
            }
        })
    }

    start(): void {
        const animation = () => {
            this.requestAnimationId = requestAnimationFrame(animation)
            this.ctx.clearRect(0, 0, WINDOW.width, WINDOW.height)
            this.mainPlayer.draw()
            this.mainPlayer.getPlayerProjectTile().forEach(item => item.draw())
            this.enemyFactory.getEnemy().forEach(item => item.draw())
            this.handleCollision()
        }
        animation()
    }
}