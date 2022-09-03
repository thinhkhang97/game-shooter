import { WINDOW } from "@app/config";
import { Game } from "@app/game";
import { ClassicEnemy, ClassicPlayerGun, ClassicShooterPlayer, IEnemy, IShooterPlayer } from "./components";
import { ClassicEnemyFactory, IEnemyFactory } from "./components/enemy-factory";

export class Shooter extends Game {

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

    start(): void {
        const animation = () => {
            this.ctx.clearRect(0, 0, WINDOW.width, WINDOW.height)
            this.mainPlayer.draw()
            this.mainPlayer.getPlayerProjectTile().forEach(item => item.draw())
            this.enemyFactory.getEnemy().forEach(item => item.draw())
            requestAnimationFrame(animation)
        }
        animation()
    }
}