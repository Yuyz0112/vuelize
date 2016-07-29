<template>
  <h3>Gallery</h3>
  <div class="row" 
  v-for="group of charts">
    <div class="column"
    v-for="item of group"
    v-link="nameToLink(item)">{{ item }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      charts: [
        ['Area Chart', 'Bar Chart', 'Line Chart'],
        ['Group Bar Chart', 'Scatter Plot']
      ]
    }
  },
  methods: {
    nameToLink (name) {
      const reg = / /g
      return name.toLowerCase().replace(reg, '-')
    }
  }
}
</script>

<style scoped>
</style>