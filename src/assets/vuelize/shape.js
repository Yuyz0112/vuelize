'use strict'
const tau = 2 * Math.PI

const identity = d => d

class Pie {
  constructor () {
    this.startAngle = 0
    this.endAngle = tau
    this.padAngle = 0
  }

  pie (data) {
    const n = data.length
    let sum = 0
    let index = new Array(n)
    let arcs = new Array(n)
    let a0 = +this.startAngle
    let da = Math.min(tau, Math.max(-tau, this.endAngle - a0))
    let p = Math.min(Math.abs(da) / n, this.padAngle)
    let pa = p * (da < 0 ? -1 : 1)
    let v, a1, k

    for (let i = 0; i < n; i++) {
      index[i] = i
      arcs[index[i]] = +identity(data[i], i, data)
      if ((v = arcs[index[i]]) > 0) {
        sum += v
      }
    }

    for (let i = 0; i < n; ++i, a0 = a1) {
      k = sum ? (da - n * pa) / sum : 0
      let j = index[i]
      v = arcs[j]
      a1 = a0 + (v > 0 ? v * k : 0) + pa
      arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      }
    }

    return arcs
  }
}

const pie = () => new Pie()

export default { pie }
