'use strict'
const pi = Math.PI
const tau = 2 * pi
const epsilon = 1e-6
const tauEpsilon = tau - epsilon

class Path {
  constructor () {
    this._x0 = this._y0 =
    this._x1 = this._y1 = null
    this._ = []
  }
  moveTo (x, y) {
    this._.push('M', this._x0 = this._x1 = +x, ',', this._y0 = this._y1 = +y)
  }
  closePath () {
    if (this._x1 !== null) {
      this._x1 = this._x0
      this._y1 = this._y0
      this._.push('Z')
    }
  }
  lineTo (x, y) {
    this._.push('L', this._x1 = +x, ',', this._y1 = +y)
  }
  quadraticCurveTo (x1, y1, x, y) {
    this._.push('Q', +x1, ',', +y1, ',', this._x1 = +x, ',', this._y1 = +y)
  }
  bezierCurveTo (x1, y1, x2, y2, x, y) {
    this._.push('C', +x1, ',', +y1, ',', +x2, ',', +y2, ',', this._x1 = +x, ',', this._y1 = +y)
  }
  arcTo (x1, y1, x2, y2, r) {
    x1 = +x1
    y1 = +y1
    x2 = +x2
    y2 = +y2
    r = +r
    const x0 = this._x1
    const y0 = this._y1
    const x21 = x2 - x1
    const y21 = y2 - y1
    const x01 = x0 - x1
    const y01 = y0 - y1
    const l012 = x01 * x01 + y01 * y01

    if (r < 0) throw new Error('negative radius: ' + r)

    if (this._x1 === null) {
      this.moveTo(x1, y1)
    } else if (!(l012 > epsilon)) {
    } else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this.lineTo(x1, y1)
    } else {
      const x20 = x2 - x0
      const y20 = y2 - y0
      const l212 = x21 * x21 + y21 * y21
      const l202 = x20 * x20 + y20 * y20
      const l21 = Math.sqrt(l212)
      const l01 = Math.sqrt(l012)
      const l = r * Math.tan((pi - Math.acos((l212 + l012 - l202) / (2 * l21 * l01))) / 2)
      const t01 = l / l01
      const t21 = l / l21

      if (Math.abs(t01 - 1) > epsilon) {
        this._.push('L', x1 + t01 * x01, ',', y1 + t01 * y01)
      }
      this._.push('A', r, ',', r, ',0,0,', +(y01 * x20 > x01 * y20), ',', this._x1 = x1 + t21 * x21, ',', this._y1 = y1 + t21 * y21)
    }
  }
  arc (x, y, r, a0, a1, ccw) {
    x = +x
    y = +y
    r = +r
    const dx = r * Math.cos(a0)
    const dy = r * Math.sin(a0)
    const x0 = x + dx
    const y0 = y + dy
    const cw = 1 ^ ccw
    let da = ccw ? a0 - a1 : a1 - a0

    if (r < 0) throw new Error('negative radius: ' + r)

    if (this._x1 === null) {
      this._.push('M', x0, ',', y0)
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._.push('L', x0, ',', y0)
    }

    if (!r) return

    if (da > tauEpsilon) {
      this._.push('A', r, ',', r, ',0,1,', cw, ',', x - dx, ',', y - dy, 'A', r, ',', r, ',0,1,', cw, ',', this._x1 = x0, ',', this._y1 = y0)
    } else {
      if (da < 0) da = da % tau + tau
      this._.push('A', r, ',', r, ',0,', +(da >= pi), ',', cw, ',', this._x1 = x + r * Math.cos(a1), ',', this._y1 = y + r * Math.sin(a1))
    }
  }
  rect (x, y, w, h) {
    this._.push('M', this._x0 = this._x1 = +x, ',', this._y0 = this._y1 = +y, 'h', +w, 'v', +h, 'h', -w, 'Z')
  }
  toString () {
    return this._.join('')
  }
}

const path = () => new Path()

export default path
