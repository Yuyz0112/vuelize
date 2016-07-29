<template>
  <div class="container">
    <img class="logo" src="./assets/vuelize.png">
    <h1 class="title text-center">Vuelize.js</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<style lang="sass">
  @import "./assets/sass/milligram"
  .logo
    display: block
    margin: 0 auto
</style>