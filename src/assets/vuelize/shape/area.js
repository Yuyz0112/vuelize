'use strict'
import path from '../path'
import curveLinear from './curve/linear'
import line from './line'
import {x as pointX, y as pointY} from './point'

export default () => {
  let x0 = pointX
  let x1 = null
  const y0 = 0
  const y1 = pointY
  const defined = true
  const context = null
  const curve = curveLinear
  let output = null

  const area = data => {
    const n = data.length
    let defined0 = false
    let buffer
    let d
    let j
    const x0z = new Array(n)
    const y0z = new Array(n)

    if (context === null) {
      buffer = path()
      output = curve(buffer)
    }

    for (let i = 0; i <= n; i++) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        defined0 = !defined0
        if (defined0) {
          j = i
          output.areaStart()
          output.lineStart()
        } else {
          output.lineEnd()
          output.lineStart()
          for (let k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k])
          }
          output.lineEnd()
          output.areaEnd()
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data)
        y0z[i] = +y0(d, i, data)
        output.point(x1 ? +x1(d, i, data) : +x0z[i], y1 ? +y1(d, i, data) : y0z[i])
      }
    }

    if (buffer) {
      output = null
      return buffer + '' || null
    }
  }

  const arealine = () => line().defined(defined).curve(curve).context(context)
  console.log(arealine)

  area.x = _ => {
    const _x = arguments.length ? (x0 = typeof _ === 'function' ? _ : x1 = null, area) : x0
    return _x
  }

  return area
}
