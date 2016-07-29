<template>
  <h2 class="text-center">Area Chart</h2>
  <svg width="960" height="500"></svg>
</template>

<script>
import mock from 'mock'
import vuelize from '../assets/vuelize'

export default {
  data () {
    return {
      data: mock.levelVsRank.results
    }
  },
  created () {
    vuelize.area()
  }
}
</script>

<style scoped lang="sass">
</style>