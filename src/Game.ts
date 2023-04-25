import { canvas, ctx } from './main'

type Vec = [number, number]

export default class Game {
  ball: Ball

  constructor() {
    this.ball = new Ball(4, [canvas.width / 2, canvas.width / 2])
  }

  update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ball.render()
    this.ball.move()
    this.ball.handleCollisions()
  }
}

class Ball {
  vel: Vec = [1, 0.5]

  constructor(public r: number, public pos: Vec) {}

  render() {
    const { r, pos } = this
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(pos[0] + r, pos[1] + r, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }

  move() {
    // apply velocity to position
    const [dx, dy] = this.vel
    this.pos[0] += dx
    this.pos[1] += dy
  }

  handleCollisions() {
    const r = this.r
    const [x, y] = this.pos
    const [w, h] = [canvas.width, canvas.height]

    // reverse x velocity if ball hits left or right wall
    if (x < 0 || x + 2 * r > w) {
      this.vel[0] *= -1
    }

    // reverse y velocity if ball hits top or bottom wall
    if (y < 0 || y + 2 * r > h) {
      this.vel[1] *= -1
    }
  }
}
