'use strict'

class Linear {
  constructor (context) {
    this._context = context
  }
  areaStart () {
    this._line = 0
  }
  areaEnd () {
    this._line = NaN
  }
  lineStart () {
    this._point = 0
  }
  lineEnd () {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath()
    this._line = 1 - this._line
  }
  point (x, y) {
    x = +x
    y = +y
    switch (this._point) {
      case 0:
        this._point = 1
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y)
        break
      case 1:
        this._point = 2
        break
      default:
        this._context.lineTo(x, y)
        break
    }
  }
}

export default context => new Linear(context)
