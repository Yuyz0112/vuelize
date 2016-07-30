<template>
  <h2 class="text-center">Area Chart</h2>
  <svg
  :width="svgWidth"
  :height="svgHeight">
    <g
    :transform="transform">
      <path
      :d="path">
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
        left: 50
      },
      svgWidth: 960,
      svgHeight: 500
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

      path.moveTo(scaleX.linear(firstPoint[0]), scaleY.linear(firstPoint[1]))
      this.data.forEach(point => path.lineTo(scaleX.linear(point[0]), scaleY.linear(point[1])))

      path.lineTo(scaleX.linear(lastPoint[0]), this.height)
      path.lineTo(0, this.height)
      path.closePath()
      return path.toString()
    }
  }
}
</script>

<style scoped lang="sass">
  path
    fill: #97fee0
</style>