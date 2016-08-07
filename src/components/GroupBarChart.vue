<template>
  <h2 class="text-center">Group Bar Chart</h2>
  <svg
  :width="svgWidth"
  :height="svgHeight">
    <g
    :transform="transform">
      <g
      v-for="rect of rects">
        <rect class="kd" x="0"
        :width="rect.width"
        :height="rect.height"
        :y="rect.y"></rect>
        <rect class="pop" x="0"
        :width="rect._width"
        :height="rect.height"
        :y="rect._y"></rect>
        <text dy="1em" x="-30"
        :y="rect.y">{{ rect.hero | cap }}</text>
      </g>
    </g>
  </svg>
</template>

<script>
import mock from 'mock'
import Axis from './Axis'

export default {
  components: { Axis },
  data () {
    return {
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 60
      },
      svgWidth: 500,
      svgHeight: 960
    }
  },
  computed: {
    data () {
      let arr = []
      mock.heroUsage.results[0].rank.forEach(point => arr.push({
        hero: point._id,
        kd: point.kd,
        pop: point.popularity
      }))
      return arr
    },
    width () {
      const width = this.svgWidth - this.margin.left - this.margin.right
      return width
    },
    height () {
      const height = this.svgHeight - this.margin.top - this.margin.bottom
      return height
    },
    transform () {
      return `translate(${this.margin.left},${this.margin.top})`
    },
    maxKd () {
      const arr = this.data.slice(0)
      arr.sort((a, b) => b.kd - a.kd)
      return arr[0].kd
    },
    maxPop () {
      const arr = this.data.slice(0)
      arr.sort((a, b) => b.pop - a.pop)
      return arr[0].pop
    },
    rects () {
      let arr = []
      const height = this.height / (2 * this.data.length)
      for (var i = 0; i < this.data.length; i++) {
        const val = this.data[i]
        const width = this.width * val.kd / this.maxKd
        const _width = this.width * val.pop / this.maxPop
        const y = 2 * i * height
        const _y = (2 * i + 0.6) * height
        arr.push({
          width,
          _width,
          height: 0.6 * height,
          y,
          _y,
          hero: val.hero
        })
      }
      return arr
    }
  },
  filters: {
    cap (val) {
      return val.substr(0, 3)
    }
  }
}
</script>

<style scoped lang="sass">
  .kd
    fill: rgba(151, 254, 224, .7)
  .pop
    fill: steelblue
  text
    text-anchor: middle
</style>