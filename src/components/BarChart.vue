<template>
  <h2 class="text-center">Bar Chart</h2>
  <svg
  :width="svgWidth"
  :height="svgHeight">
    <g
    :transform="transform">
      <g
      v-for="rect of rects">
        <rect
        :width="rect.width"
        :height="rect.height"
        :x="rect.x"
        :y="rect.y"></rect>
        <text dy="1em"
        :x="rect.x"
        :y="height">{{ rect.hero | cap }}</text>
      </g>
      <axis
      :horizontal="false"
      :decimal="1"
      :size="height"
      :tick-number="ticks"
      :domain="[height, 0]"
      :range="[0, maxKd]"
      transform="translate(-2,0)"
      label="Hero K/D"></axis>
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
      svgWidth: 960,
      svgHeight: 500,
      ticks: 5
    }
  },
  computed: {
    data () {
      let arr = []
      mock.heroUsage.results[0].rank.forEach(point => arr.push({
        hero: point._id,
        kd: point.kd
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
    rects () {
      let arr = []
      const width = this.width / this.data.length
      for (var i = 0; i < this.data.length; i++) {
        const val = this.data[i]
        const height = this.height * val.kd / this.maxKd
        const x = i * width + 0.2 * width
        const y = this.height - height
        arr.push({
          width: 0.8 * width,
          height,
          x,
          y,
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
  rect
    fill: rgba(151, 254, 224, .7)
    transition: .3s ease-in-out
    &:hover
      fill: rgba(151, 254, 224, 1)
</style>