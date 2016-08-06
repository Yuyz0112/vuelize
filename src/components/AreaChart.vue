<template>
  <h2 class="text-center">Area Chart</h2>
  <svg
  :width="svgWidth"
  :height="svgHeight">
    <g
    :transform="transformPath">
      <path class="area"
      :d="path"></path>
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
      :domain="[this.height, 0]"
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
    transformPath () {
      return `translate(${this.margin.left},${this.margin.top})`
    },
    path () {
      const path = vuelize.path()
      const firstPoint = this.data[0]
      const lastPoint = this.data[this.data.length - 1]

      const scaleX = vuelize.scale()
      scaleX
      .domain([firstPoint[0], lastPoint[0]])
      .range([0, this.width])

      let arr = []
      this.data.forEach(point => arr.push(point[1]))
      const scaleY = vuelize.scale()
      scaleY
      .domain([0, vuelize.max(arr)])
      .range([this.height, 0])

      path.moveTo(0, this.height)
      this.data.forEach(point => path.lineTo(scaleX.linear(point[0]), scaleY.linear(point[1])))

      path.lineTo(scaleX.linear(lastPoint[0]), this.height)
      path.moveTo(0, this.height)
      path.closePath()
      return path.toString()
    },
    transformXAxis () {
      return `translate(0,${this.height})`
    },
    yAxisRange () {
      let arr = []
      this.data.forEach(point => arr.push(point[1]))
      return [0, vuelize.max(arr)]
    }
  }
}
</script>

<style scoped lang="sass">
  path
    &.area
      fill: rgba(151, 254, 224, .5)
      stroke: #97fee0
      stroke-width: 2
</style>