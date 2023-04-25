import Game from './Game'
import './style.css'

const _canvas = document.querySelector<HTMLCanvasElement>('canvas')
if (!_canvas) throw new Error('Canvas not found')
export const canvas = _canvas

const _ctx = canvas.getContext('2d')
if (!_ctx) throw new Error('Canvas context not found')
export const ctx = _ctx

// internal resolution
canvas.width = 64
canvas.height = 64

// background color
canvas.style.background = 'black'

// frame rate
const fps = 60
const interval = 1000 / fps
let then: number

const game = new Game()

const render = (time: number) => {
  if (then === undefined) then = time
  const delta = time - then

  window.requestAnimationFrame(render)

  if (delta > interval) {
    game.update()
    then = time - (delta % interval)
    return
  }
}

window.requestAnimationFrame(render)
