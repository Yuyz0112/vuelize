<template>
  <h2 class="text-center">Donut Chart</h2>
  <svg
  :width="svgWidth"
  :height="svgHeight">
    <g
    :transform="transform">
      <path
      :d="path"></path>
    </g>
  </svg>
</template>

<script>
import mock from 'mock'
// import vuelize from '../assets/vuelize'

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
        {
          desc: '< 40',
          count: 0
        },
        {
          desc: '40~50',
          count: 0
        },
        {
          desc: '50~60',
          count: 0
        },
        {
          desc: '60~70',
          count: 0
        },
        {
          desc: '>70',
          count: 0
        }
      ]
      mock.competitiveRank.results.forEach(point => {
        if (point._id < 40) {
          arr[0].count += point.count
        } else if (point._id < 50) {
          arr[1].count += point.count
        } else if (point._id < 60) {
          arr[2].count += point.count
        } else if (point._id < 70) {
          arr[3].count += point.count
        } else {
          arr[4].count += point.count
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
      return `translate(${this.margin.left},${this.margin.top})`
    },
    path () {
      console.log(this.data)
    }
  }
}
</script>

<style scoped lang="sass">
</style>