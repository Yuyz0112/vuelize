<template>
  <img class="logo" src="../assets/vuelize.png">
  <h1 class="text-center">Vuelize.js</h1>
  <h3>What is this?</h3>
  <p>Vuelize.js is a group of modules that bring data to life. This project will reproduce some fantastic works of d3.js combining vue.js.</p>
  <h3>Mock data</h3>
  <p>I will use some Overwatch (A new game of Blizzard Entertainment) players career data as the mock data to show the power of vuelize.js.</p>
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