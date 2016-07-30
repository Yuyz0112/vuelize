'use strict'
import path from '../path'
import curveLinear from './curve/linear'
import {x as pointX, y as pointY} from './point'

export default () => {
  let x = pointX
  let y = pointY
  let defined = true
  let context = null
  let curve = curveLinear
  let output = null

  const line = data => {
    const n = data.length
    let defined0 = false
    let d
    let buffer

    if (context === null) {
      buffer = path()
      output = curve(buffer)
    }

    for (let i = 0; i <= n; i++) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        defined0 = !defined0
        if (defined0) output.lineStart()
        else output.lineEnd()
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data))
    }

    if (buffer) {
      output = null
      return buffer + '' || null
    }
  }

  line.x = _ => arguments.length ? (x = typeof _ === 'function' ? _ : line) : x

  line.y = _ => arguments.length ? (y = typeof _ === 'function' ? _ : line) : y

  line.defined = _ => arguments.length ? (defined = typeof _ === 'function' ? _ : line) : defined

  line.curve = _ => {
    const _curve = arguments.length ? (curve = _, context !== null && (output = curve(context)), line) : curve
    return _curve
  }

  line.context = _ => {
    const _context = arguments.length ? (_ === null ? context = output = null : output = curve(context = _), line) : context
    return _context
  }

  return line
}
