import * as PIXI from 'pixi.js'
import './style.css'

export const app = new PIXI.Application<HTMLCanvasElement>({
  background: 'black',
  height: 800,
  width: 800,
})

const root = document.querySelector<HTMLDivElement>('main')
if (!root) throw new Error('Root not found')
root.appendChild(app.view)

/**
 * Bouncing ball example
 */

type Vec = [number, number]

function createBall(r: number, [x, y]: Vec) {
  const c = new PIXI.Graphics()
  const vel: Vec = [7, 4]

  c.beginFill(0xffffff)
  c.drawCircle(0, 0, r)
  c.endFill()

  c.x = x
  c.y = y

  app.ticker.add((d) => {
    c.x += vel[0] * d
    c.y += vel[1] * d

    if (c.x + r > app.screen.width || c.x - r < 0) {
      vel[0] *= -1
    }

    if (c.y + r > app.screen.height || c.y - r < 0) {
      vel[1] *= -1
    }
  })

  return c
}

const ball = createBall(30, [100, 100])
app.stage.addChild(ball)
