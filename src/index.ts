import { Shooter } from "./games"

const canvas = window.document.getElementById("main-canvas") as HTMLCanvasElement
canvas.width = innerWidth
canvas.height = innerHeight

const ctx = canvas.getContext('2d')

if (ctx) {
    (new Shooter(ctx)).start()
}