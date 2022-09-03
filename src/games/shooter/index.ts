import { WINDOW } from "@app/config";
import { Game } from "@app/game";
import { getDistance } from "@app/utils";
import gsap from "gsap";
import { ClassicParticle, ClassicPlayerGun, ClassicShooterPlayer, IParticle, IShooterPlayer } from "./components";
import { ClassicEnemyFactory, IEnemyFactory } from "./components/enemy-factory";

export class Shooter extends Game {
    private requestAnimationId?: number

    private mainPlayer: IShooterPlayer

    private enemyFactory: IEnemyFactory

    private particles: IParticle[] = []

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
        const playerPostition = { x: WINDOW.width / 2, y: WINDOW.height / 2 }
        const playerGun = new ClassicPlayerGun(this.ctx, playerPostition)
        this.mainPlayer = new ClassicShooterPlayer(this.ctx, playerPostition, playerGun)
        this.enemyFactory = new ClassicEnemyFactory(this.ctx, playerPostition)
        this.initGame()

    }

    initGame() {
        this.ctx.canvas.style.backgroundColor = "rgba(0,0,0,0.9)"
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

                // Project tile hits an enemy
                if (distance < enemy.getRadius() + tile.getSize()) {
                    gsap.to(enemy, { radius: enemy.getRadius() - tile.getPower(), ease: "bounce.out" })
                    for (let i = 0; i < 8; i++) {
                        this.particles.push(new ClassicParticle(this.ctx, tile.getPosition(), enemy.getColor(), {
                            x: (Math.random() - 0.5) * (Math.random() * 16),
                            y: (Math.random() - 0.5) * (Math.random() * 16),
                        }))
                    }
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

    handleOutOfScreen() {
        const enemies = this.enemyFactory.getEnemy()
        const projectTile = this.mainPlayer.getPlayerProjectTile()

        enemies.forEach((item, index) => {
            const enemyPos = item.getPosition()
            if (enemyPos.x > WINDOW.width || enemyPos.x < 0 || enemyPos.y < 0 || enemyPos.y > WINDOW.height) {
                enemies.splice(index, 1)
            }
        })

        projectTile.forEach((item, index) => {
            const tilePos = item.getPosition()
            if (tilePos.x > WINDOW.width || tilePos.x < 0 || tilePos.y < 0 || tilePos.y > WINDOW.height) {
                projectTile.splice(index, 1)
            }
        })

        this.particles.forEach((item, index) => {
            if (item.getAlpha() <= 0.01 || item.getRadius() < 0) {
                this.particles.splice(index, 1)
            }
        })
    }

    start(): void {
        const animation = () => {
            this.requestAnimationId = requestAnimationFrame(animation)
            this.ctx.fillStyle = "rgba(0, 0, 0 , 0.3)"
            this.ctx.fillRect(0, 0, WINDOW.width, WINDOW.height)

            this.mainPlayer.draw()
            this.mainPlayer.getPlayerProjectTile().forEach(item => item.draw())
            this.enemyFactory.getEnemy().forEach(item => item.draw())
            this.particles.forEach(item => item.draw())
            this.handleCollision()
            this.handleOutOfScreen()
        }
        animation()
    }
}