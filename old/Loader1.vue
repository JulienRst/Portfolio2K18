<template lang="html">
  <section class="loader column" :class="{disapear: afterLoaded, reduce: endLoaded}" v-if="show">
    <div class="text">
      LOADING {{ chargeValue }}
    </div>
    <div class="bar row">
      <div class="arrow-left">
        &lt;
      </div>
      <div class="ctn-slashes row">
        <div class="slashes">
          {{ chargeDash }}
        </div>
      </div>
      <div class="customSlashe" v-if="endLoaded">
        /
      </div>
      <div class="arrow-right">
        &gt;
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'loader',
  props: ['loaded', 'charge'],
  data () {
    return {
      customLoaded: false,
      afterLoaded: false,
      endLoaded: false
    }
  },
  computed: {
    show () {
      return !this.customLoaded
    },
    chargeValue () {
      return `${Math.round(this.charge * 100)}%`
    },
    chargeDash () {
      const length = 23
      return '/ '.repeat(this.charge * length)
    }
  },
  watch: {
    loaded (value) {
      if (value) {
        this.endLoaded = true
        window.setTimeout(() => { this.afterLoaded = true }, 1000)
        window.setTimeout(() => { this.customLoaded = true }, 2000)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
