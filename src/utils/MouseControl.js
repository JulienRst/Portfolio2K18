class MouseControl {
  constructor (el) {
    this.x = 0
    this.y = 0
    this.value = ''
    this.display = el
    window.addEventListener('mousemove', (e) => {
      this.compute(e)
    })
  }

  compute = (event) => {
    this.x = event.clientX
    this.y = event.clientY
    this.value = (this.x * this.y * 5000000000 + 10000000000000).toString(36)
    this.updateDisplay()
  }

  updateDisplay = () => {
    this.display.innerHTML = this.value
  }

  getCoords = () => {
    return { x: Math.round(this.x - (window.innerWidth / 2)), y: Math.round(this.y - (window.innerHeight / 2)) }
  }
}

export default MouseControl
