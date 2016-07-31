<template>
  <h2 class="text-center">Area Chart</h2>
  <svg
  :width="svgWidth"
  :height="svgHeight">
    <g
    :transform="transformPath">
      <path class="area"
      :d="path"></path>
      <g class="axis"
      :transform="transformXAxis">
        <g
        v-for="tick of axisX"
        :transform="tick.transform">
          <line x2="0" y2="6"></line>
          <text x="0" y="9" dy=".71em">{{ parseInt(tick.val) }}</text>
        </g>
        <path class="domain"
        :d="'M0,0 H' + width"></path>
        <text class="label" y="-6" dy="-.71em"
        :x="width">Competitive Rank</text>
      </g>
      <g class="axis">
        <g
        v-for="tick of axisY"
        :transform="tick.transform">
          <line x1="-2" x2="-8" y2="0"></line>
          <text x="-30" y="0" dy=".32em">{{ (tick.val).toFixed(1) }}</text>
        </g>
        <path class="domain"
        :d="'M-2,0 V' + height"></path>
        <text class="label" transform="rotate(-90)" y="6" dy=".71em">Avg Level</text>
      </g>
    </g>
  </svg>
</template>

<script>
import mock from 'mock'
import vuelize from '../assets/vuelize'

export default {
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
    transformXAxis () {
      return `translate(0,${this.height})`
    },
    domainX () {
      console.log('calc')
      return [vuelize.min(this.data), vuelize.max(this.data)]
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
    axisX () {
      const tick = this.width / this.xTicks
      let arr = []

      const scale = vuelize.scale()
      scale
      .domain([0, this.width])
      .range([this.data[0][0], this.data[this.data.length - 1][0]])

      for (let i = 0; i <= this.xTicks; i++) {
        arr[i] = {
          val: scale.linear(tick * i),
          transform: `translate(${tick * i},0)`
        }
      }
      return arr
    },
    axisY () {
      const tick = this.height / this.yTicks
      let arr = []

      let _arr = []
      this.data.forEach(point => _arr.push(point[1]))
      const scale = vuelize.scale()
      scale
      .domain([this.height, 0])
      .range([0, vuelize.max(_arr)])

      for (let i = 0; i <= this.yTicks; i++) {
        arr[i] = {
          val: scale.linear(tick * i),
          transform: `translate(0,${tick * i})`
        }
      }
      return arr
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
  .axis
    line,
    path
      fill: none
      stroke: #303841
      shape-rendering: crispEdges;
    text
      text-anchor: middle
    .label
      text-anchor: end
</style>