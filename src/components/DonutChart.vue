<template>
  <h2 class="text-center">Donut Chart</h2>
  <svg
  :width="svgWidth"
  :height="svgHeight">
    <g
    :transform="transform">
      <path d="M -239.7935922865823, 9.951537484044003

A 240, 240 0 0, 1 -25.080788568417415, -238.68588991556737

L -18.81059142631306, -179.01441743667553

A 180, 180 0 0, 0 -179.84519421493673, 7.463653113033002

Z" style="fill: rgb(208, 116, 60);"></path>
      <path
      :d="path"></path>
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
      const arr = [
        ['<40', '40-50', '50-60', '60-70', '>=70'],
        [0, 0, 0, 0, 0]
      ]
      mock.competitiveRank.results.forEach(point => {
        if (point._id < 40) {
          arr[1][0] += point.count
        } else if (point._id < 50) {
          arr[1][1] += point.count
        } else if (point._id < 60) {
          arr[1][2] += point.count
        } else if (point._id < 70) {
          arr[1][3] += point.count
        } else {
          arr[1][4] += point.count
        }
      })
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
      return `translate(${this.svgWidth / 2},${this.svgHeight / 2})`
    },
    path () {
      const pie = vuelize.shape.pie()
      const data = pie.pie(this.data[1])
      console.log(data)
    }
  }
}
</script>

<style scoped lang="sass">
</style>