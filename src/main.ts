import * as PIXI from 'pixi.js'
import './style.css'
import { ranVec } from './util'
import { createBall } from './ball'

export const app = new PIXI.Application<HTMLCanvasElement>({
  background: 'black',
  height: 800,
  width: 800,
  antialias: true,
})

// @ts-ignore
globalThis.__PIXI_APP__ = app

const root = document.querySelector<HTMLDivElement>('main')
if (!root) throw new Error('Root not found')
root.appendChild(app.view)

const balls = new Array(3).fill(null).map(() => {
  const pos = ranVec([0, 0], [app.screen.width, app.screen.height])
  const vel = ranVec([3, 3], [20, 20])
  return createBall(30, pos, vel)
})

balls.forEach((ball) => app.stage.addChild(ball))
