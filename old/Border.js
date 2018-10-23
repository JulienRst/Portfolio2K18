import Animator from '@/utils/Animator'

class Border {
  constructor () {
    this.el = null
    this.c = null
    this.width = null
    this.height = null
    this.step = null
    this.currentStep = 0
    this.tmpAnim = [null, null]
  }

  setEl (el) {
    this.el = el
    this.c = this.el.getContext('2d')
    this.init()
  }

  init () {
    const VIT = 15
    this.width = this.el.offsetWidth * 4
    this.height = this.el.offsetHeight * 4
    this.el.width = this.width
    this.el.height = this.height
    this.step = [
      [
        { x: this.width / 2, y: 10, d: VIT },
        { x: 10, y: 10, d: VIT },
        { x: 10, y: this.height - 10, d: VIT },
        { x: this.width / 2, y: this.height - 10, d: VIT }
      ],
      [
        { x: this.width / 2, y: 10, d: VIT },
        { x: this.width - 10, y: 10, d: VIT },
        { x: this.width - 10, y: this.height - 10, d: VIT },
        { x: this.width / 2, y: this.height - 10, d: VIT }
      ]
    ]
  }

  launch () {
    this.c.clearRect(0, 0, this.width, this.height)
    this.draw()
  }

  draw () {
    if (this.currentStep < this.step[0].length - 1) {
      // this.c.clearRect(0, 0, this.width, this.height)
      let currentA = this.compute(0)
      let currentB = this.compute(1)
      this.c.lineWidth = 15
      this.c.strokeStyle = '#696969'
      // Gauche
      this.c.beginPath()
      this.c.moveTo(this.width / 2, 10)
      for (let i = 0; i <= this.currentStep; i++) {
        this.c.lineTo(this.step[0][i].x, this.step[0][i].y)
      }
      this.c.lineTo(currentA.x, currentA.y)
      this.c.stroke()
      // Droite
      this.c.beginPath()
      this.c.moveTo(this.width / 2, 10)
      for (let i = 0; i <= this.currentStep; i++) {
        this.c.lineTo(this.step[1][i].x, this.step[1][i].y)
      }
      this.c.lineTo(currentB.x, currentB.y)
      this.c.stroke()
      this.getAnimationFrame(this.draw)
    } else {
      console.log('Stop Animate')
    }
  }

  compute (idLine) {
    const current = this.step[idLine][this.currentStep]
    const next = this.step[idLine][this.currentStep + 1]
    if (!this.tmpAnim[idLine]) {
      this.tmpAnim[idLine] = { x: new Animator(current.x, next.x, current.d), y: new Animator(current.y, next.y, current.d) }
    } else {
      this.tmpAnim[idLine].x.iterate()
      this.tmpAnim[idLine].y.iterate()
    }

    if (this.tmpAnim[idLine].x.get() === next.x && this.tmpAnim[idLine].y.get() === next.y) {
      this.tmpAnim[idLine] = null
      // Cela implique que les Animators aient la même durée
      if (!this.tmpAnim[0] && !this.tmpAnim[1]) this.currentStep += 1
      return { x: next.x, y: next.y }
    } else {
      return { x: this.tmpAnim[idLine].x.get(), y: this.tmpAnim[idLine].y.get() }
    }
  }

  getAnimationFrame = (method) => {
    requestAnimationFrame(method.bind(this))
  }
}

const border = new Border()
export default border
