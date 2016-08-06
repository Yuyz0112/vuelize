<template>
  <g class="axis"
  :transform="transform">
    <g
    v-for="tick of ticks"
    :transform="tick.transform">
      <line
      :x2="horizontal ? 0 : -6"
      :y2="horizontal ? 6 : 0"></line>
      <text
      :x="horizontal ? 0 : -30"
      :y="horizontal ? 9 : 0"
      :dy="horizontal ? '.71em' : '.32em'">{{ (tick.val).toFixed(decimal) }}</text>
    </g>
    <path class="domain"
    :d="path"></path>
    <text class="label"
    :y="horizontal ? -6 : 6"
    :dy="horizontal ? '-.71em' : '.71em'"
    :transform="horizontal ? '' : 'rotate(-90)'"
    :x="horizontal ? size : 0">{{ label }}</text>
  </g>
</template>

<script>
import vuelize from '../assets/vuelize'

export default {
  props: {
    transform: {
      type: String,
      default: ''
    },
    tickNumber: {
      type: Number,
      default: 1
    },
    domain: {
      type: Array,
      default: () => []
    },
    range: {
      type: Array,
      default: () => []
    },
    horizontal: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 0
    },
    decimal: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    ticks () {
      const tick = this.size / this.tickNumber
      let arr = []

      const scale = vuelize.scale()
      scale
      .domain(this.domain)
      .range(this.range)

      for (let i = 0; i <= this.tickNumber; i++) {
        arr[i] = {
          val: scale.linear(tick * i),
          transform: this.horizontal ? `translate(${tick * i},0)` : `translate(0,${tick * i})`
        }
      }
      return arr
    },
    path () {
      return this.horizontal ? `M0,0 H${this.size}` : `M0,0 V${this.size}`
    }
  }
}
</script>

<style scoped lang="sass">
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