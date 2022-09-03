import { WINDOW } from "@app/config";
import { Game } from "@app/game";
import { ClassicPlayerGun, ClassicProjectTile, ClassicShooterPlayer, IShooterPlayer } from "./components";

export class Shooter extends Game {

    private mainPlayer: IShooterPlayer

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
        const playerPostition = { x: WINDOW.width / 2, y: WINDOW.height / 2 }
        const playerGun = new ClassicPlayerGun(ctx, playerPostition)
        this.mainPlayer = new ClassicShooterPlayer(ctx, playerPostition, playerGun)
    }

    start(): void {
        const animation = () => {
            requestAnimationFrame(animation)
            this.ctx.clearRect(0, 0, WINDOW.width, WINDOW.height)
            this.mainPlayer.draw()
            this.mainPlayer.getPlayerProjectTile().forEach(item => item.draw())
        }
        animation()
    }
}