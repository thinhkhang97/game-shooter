import type { Position } from "@app/type"

export const getDistance = (a: Position, b: Position) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}