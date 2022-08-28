import { Game } from './game'

const canvas = window.document.getElementById("main-canvas") as HTMLCanvasElement
canvas.width = innerWidth
canvas.height = innerHeight

const ctx = canvas.getContext('2d')

if (ctx) {
    (new Game(ctx)).start()
}