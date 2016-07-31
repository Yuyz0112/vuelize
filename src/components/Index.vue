<template>
  <img class="logo" src="../assets/vuelize.png">
  <h1 class="text-center">Vuelize.js</h1>
  <h3>What is this?</h3>
  <p>Vuelize is a modern solution of web data visualization beyond a js framework vue.js. By combining the great features of vue.js and the power of SVG, we can create a lot of fantastic works.</p>
  <p>If you are familiar with d3.js, you will find Vuelize.js has many useful features as same as d3.js.</p>
  <h3>Mock data</h3>
  <p>I will use some Overwatch (An online game provided by Blizzard Entertainment) players' career data as the mock data to show the power of vuelize.js.</p>
  <gallery></gallery>
</template>

<script>
import Gallery from './Gallery'

export default {
  components: { Gallery }
}
</script>

<style scoped>
</style>