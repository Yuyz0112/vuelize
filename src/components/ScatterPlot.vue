<template>
  <h2 class="text-center">Line Chart</h2>
  <svg
  :width="svgWidth"
  :height="svgHeight">
    <g
    :transform="transform">
      <circle r="5"
      v-for="circle of circles"
      :cx="circle.cx"
      :cy="circle.cy"
      :fill="fillColor(circle.k)"></circle>
      <axis
      :size="width"
      :tick-number="xTicks"
      :domain="[0, width]"
      :range="[data[0][0], data[data.length - 1][0]]"
      :transform="transformXAxis"
      label="Competitive Rank"></axis>
      <axis
      :horizontal="false"
      :decimal="1"
      :size="height"
      :tick-number="yTicks"
      :domain="[height, 0]"
      :range="yAxisRange"
      transform="translate(-2,0)"
      label="Avg Level"></axis>
    </g>
  </svg>
</template>

<script>
import mock from 'mock'
import vuelize from '../assets/vuelize'
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
      xTicks: 5,
      yTicks: 8
    }
  },
  computed: {
    data () {
      let arr = []
      mock.levelVsRank.results.forEach(point => arr.push([point._id, point.level]))
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
    transformXAxis () {
      return `translate(0,${this.height})`
    },
    yAxisRange () {
      let arr = []
      this.data.forEach(point => arr.push(point[1]))
      return [0, vuelize.max(arr)]
    },
    circles () {
      let arr = []
      const firstPoint = this.data[0]
      const lastPoint = this.data[this.data.length - 1]

      const scaleX = vuelize.scale()
      scaleX
      .domain([firstPoint[0], lastPoint[0]])
      .range([0, this.width])

      let _arr = []
      this.data.forEach(point => _arr.push(point[1]))
      const maxY = vuelize.max(_arr)

      const scaleY = vuelize.scale()
      scaleY
      .domain([0, maxY])
      .range([this.height, 0])

      this.data.forEach(val => {
        arr.push({
          cx: scaleX.linear(val[0]),
          cy: scaleY.linear(val[1]),
          k: val[1] / maxY
        })
      })
      return arr
    }
  },
  methods: {
    fillColor (k) {
      const color = vuelize.color()
      return color.format('mediumblue').brighter(1 - k).toString()
    }
  }
}
</script>

<style scoped lang="sass">
</style>