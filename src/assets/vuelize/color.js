'use strict'

const reHex3 = /^#([0-9a-f]{3})$/
const reHex6 = /^#([0-9a-f]{6})$/
const reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/
const reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/
const reRgbaInteger = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/
const reRgbaPercent = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/
const reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/
const reHslaPercent = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/

const named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
}

class Color {
  constructor () {
    this.f = {}
  }
  format (str) {
    let m
    str = (str + '').trim().toLowerCase()
    if (reHex3.exec(str)) {
      m = parseInt(reHex3.exec(str)[1], 16)
      this.f = new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)
    } else if (reHex6.exec(str)) {
      m = parseInt(reHex6.exec(str)[1], 16)
      this.f = this.rgbn(m)
    } else if (reRgbInteger.exec(str)) {
      m = reRgbInteger.exec(str)
      this.f = new Rgb(m[1], m[2], m[3], 1)
    } else if (reRgbPercent.exec(str)) {
      m = reRgbPercent.exec(str)
      const r = 255 / 100
      this.f = new Rgb(m[1] * r, m[2] * r, m[3] * r, 1)
    } else if (reRgbaInteger.exec(str)) {
      m = reRgbaInteger.exec(str)
      this.f = this.rgba(m[1], m[2], m[3], m[4])
    } else if (reRgbaPercent.exec(str)) {
      m = reRgbaPercent.exec(str)
      const r = 255 / 100
      this.f = this.rgba(m[1] * r, m[2] * r, m[3] * r, m[4])
    } else if (reHslPercent.exec(str)) {
      m = reHslPercent.exec(str)
      this.f = this.hsla(m[1], m[2] / 100, m[3] / 100, 1)
    } else if (reHslaPercent.exec(str)) {
      m = reHslaPercent.exec(str)
      this.f = this.hsla(m[1], m[2] / 100, m[3] / 100, m[4])
    } else if (named.hasOwnProperty(str)) {
      this.f = this.rgbn(named[str])
    } else if (str === 'transparent') {
      this.f = new Rgb(NaN, NaN, NaN, 0)
    } else {
      this.f = null
      throw new Error('Invalid color format.')
    }
    return this.f
  }
  rgbn (n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1)
  }
  rgba (r, g, b, a) {
    if (a <= 0) r = g = b = NaN
    return new Rgb(r, g, b, a)
  }
  hsla (h, s, l, a) {
    if (a <= 0) {
      h = s = l = NaN
    } else if (l <= 0 || l >= 1) {
      h = s = NaN
    } else if (s <= 0) {
      h = NaN
    }
    return new Hsl(h, s, l, a).rgb()
  }
}

class Rgb {
  constructor (r, g, b, opacity) {
    this.r = +r
    this.g = +g
    this.b = +b
    this.opacity = +opacity
  }
  brighter (k) {
    k = k == null ? 0 : k
    return new Rgb(this.r + (255 - this.r) * k, this.g + (255 - this.g) * k, this.b + (255 - this.b) * k, this.opacity)
  }
  darker (k) {
    k = k == null ? 0 : k
    return new Rgb(this.r - (this.r - 0) * k, this.g - (this.g - 0) * k, this.b - (this.b - 0) * k, this.opacity)
  }
  toString () {
    let a = this.opacity
    a = isNaN(a) ? 1 : Math.max(0, Math.min(a, 1))
    return a === 1 ? `rgb(${this.check(this.r)},${this.check(this.g)},${this.check(this.b)})` : `rgba(${this.check(this.r)},${this.check(this.g)},${this.check(this.b)},${a})`
  }
  check (val) {
    return Math.max(0, Math.min(255, Math.round(val) || 0))
  }
}

class Hsl {
  constructor (h, s, l, opacity) {
    this.h = +h
    this.s = +s
    this.l = +l
    this.opacity = +opacity
  }
  rgb () {
    const h = this.h % 360 + (this.h < 0) * 360
    const s = isNaN(h) || isNaN(this.s) ? 0 : this.s
    const l = this.l
    const m2 = l + (l < 0.5 ? l : 1 - l) * s
    const m1 = 2 * l - m2
    return new Rgb(this.hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), this.hsl2rgb(h, m1, m2), this.hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity)
  }
  hsl2rgb (h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255
  }
}

const color = () => new Color()

export default color
