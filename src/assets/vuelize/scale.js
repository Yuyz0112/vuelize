'use strict'
import array from './array'

class Scale {
  constructor () {
    this._domain = []
    this._range = []
    this._tick = 0
  }
  domain (domain) {
    this._domain = domain
    return this
  }
  range (range) {
    this._range = range
    return this
  }
  tick () {
    const domain = this._domain[0] - this._domain[1]
    const range = this._range[0] - this._range[1]
    this._tick = range / domain
  }
  linear (val) {
    if (val < array.min(this._domain) || val > array.max(this._domain)) throw new Error(`Input value out of domain. Value is ${val}`)
    this.tick()
    val = (val - this._domain[0]) * this._tick + this._range[0]
    return val
  }
}

const scale = () => new Scale()

export default scale
