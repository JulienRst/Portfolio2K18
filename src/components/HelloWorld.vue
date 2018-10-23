<template>
  <section class="hello-world">
    <div class="hud column">
      <div class="on-border ctn-menu row" :class="{'hud-elem-active': anim.first, 'hud-elem-second-active': anim.second}">
        <div class="text">
          MENU
        </div>
      </div>
      <!-- NAME -->
      <div data-tilt-scale="1.3" class="ctn-text-tilt column" v-if="!anim.desc">
        <div class="name" v-animation="{value: anim.appear}">
          Julien Rousset
        </div>
        <div class="work" v-animation="{value: anim.appear}">
          Creative Developper
        </div>
      </div>
      <div class="ctn-scroll" v-if="anim.appear && anim.second">
        SCROLL DOWN
      </div>
      <!-- DESCRIPTION -->
      <div class="ctn-description column" v-if="anim.desc" v-animation="{value: anim.desc, delay: 500}">
        <div class="line small">
          <div class="content-line">
            <span class="red">Julien Rousset // Creative Developper</span>
          </div>
        </div>
        <div class="line">
          <div class="content-line">Hi, I'm a french </div>
        </div>
        <div class="line">
          <div class="content-line">
            <span class="red">front developper </span>
          </div>
        </div>
        <div class="line">
          <div class="content-line">based in Paris</div>
        </div>
        <div class="line">
          <div class="content-line">I work a lot with<span class="red"> Vue.js </span></div>
        </div>
        <div class="line">
          <div class="content-line">looking forward to make </div>
        </div>
        <div class="line">
          <div class="content-line">new stuff Come and </div>
        </div>
        <div class="line">
          <div class="content-line">look at my<span class="red">&nbsp;<span class="link">projects</span></span></div>
        </div>
        <div class="line">
          <div class="content-line">or come say Hello.<span class="red"></span></div>
        </div>
      </div>
      <div class="on-border mouse-code row" :class="{'hud-elem-active': anim.first, 'hud-elem-second-active': anim.second}">
        <div id="mouse-text" class="text">
          FF4J5LS110JK
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VanillaTilt from 'vanilla-tilt'
import MouseControl from '@/utils/MouseControl'
export default {
  name: 'HelloWorld',
  data () {
    return {
      anim: {
        appear: false,
        border: false,
        first: false,
        second: false,
        desc: false
      },
      mouse: null,
      tilt: VanillaTilt
    }
  },
  mounted () {
    console.log('/////////////////////////////////////')
    if (this.isLoaded) {
      this.launch()
    }
  },
  methods: {
    launch () {
      this.anim.appear = true
      this.anim.border = true
      setTimeout(() => { this.anim.first = true }, 2100)
      setTimeout(() => { this.anim.second = true }, 2200)
      this.mouse = new MouseControl(document.getElementById('mouse-text'))
      this.tilt.init(document.querySelector('.ctn-text-tilt'), {
        reverse: true,
        max: 35,
        perspective: 500,
        speed: 300
      })

      window.addEventListener('wheel', this.checkScroll, true)
    },
    checkScroll (e) {
      if (e.deltaY > 0) {
        window.removeEventListener('wheel', this.checkScroll, true)
        this.anim.appear = false
        document.querySelector('.ctn-text-tilt').vanillaTilt.destroy()
        setTimeout(() => { console.log(this.anim); this.anim.appear = false; this.anim.desc = true }, 1100)
      }
    }
  },
  computed: {
    isLoaded () {
      return this.$parent.isLoaded
    }
  },
  watch: {
    isLoaded (load) {
      if (load) {
        window.setTimeout(() => {
          this.launch()
        }, 2500)
      }
    }
  },
  beforeDestroy () {
    this.appear = false
    this.anim.first = false
    this.anim.second = false
  }
}

</script>

<style scoped>
</style>
