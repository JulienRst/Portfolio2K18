<template lang="html">
  <section class="loader">
    <div id="front-load" class="front">
      <div class="inner-front row">
        {{ computeCharge }}%
      </div>
    </div>
    <div class="back row">
      {{ computeCharge }}%
    </div>
  </section>
</template>

<script>
export default {
  name: 'loader',
  props: ['loaded', 'charge'],
  data () {
    return {
      computeCharge: 0
    }
  },
  computed: {},
  watch: {
    charge (value) {
      this.computeCharge = Math.round(value * 100)
      document.getElementById('front-load').style.width = value * 100 + '%'
    },
    loaded (value) {
      if (value) {
        console.log('END LOAD')
      }
    }
  }
}
</script>

<style lang="scss">

</style>
