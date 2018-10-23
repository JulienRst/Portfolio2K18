<template>
  <div id="app">
    <router-view/>
    <loader :loaded="isLoaded" :charge="loadCharge"/>
    <!-- <menu :show="false" /> -->
  </div>
</template>

<script>
import loader from './services/loader'
import Loader from './components/Loader.vue'
export default {
  name: 'App',
  components: {
    Loader
  },
  data () {
    return {
      isLoaded: false,
      loadCharge: 0
    }
  },
  mounted () {
    loader.start().subscribe((val) => {
      this.loadCharge = val
    }, () => {}, () => {
      window.setTimeout(() => { this.isLoaded = true }, 500)
    })
  }
}
</script>

<style lang="scss">
  @import '~@/assets/sass/master.scss';
</style>
