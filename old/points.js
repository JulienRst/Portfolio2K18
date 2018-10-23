const test = {
  initCanvas () {
    window.setTimeout(() => { this.appear = true }, 1000)
    console.log('/// Init Canvas')
    const c = this.canvas.getContext('2d')
    // HD ON
    this.canvas.width = 4 * document.body.offsetWidth
    this.canvas.height = 4 * document.body.offsetHeight
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100vh'
    // Fill the screen
    const wratio = 40
    const hratio = 20
    const basisX = this.canvas.width / wratio / 2
    const basisY = this.canvas.height / hratio / 2
    for (let i = 0; i < wratio; i++) {
      for (let j = 0; j < hratio; j++) {
        this.points.push(new Point(basisX + (i * this.canvas.width / wratio), basisY + (j * this.canvas.height / hratio)))
      }
    }
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX / document.body.offsetWidth
      this.mouse.y = e.clientY / document.body.offsetHeight
      this.mouse.hasMoved = true
    })
    this.draw(c)
  },
  draw (c) {
    c.fillStyle = '#494949'
    c.fillRect(0, 0, c.canvas.width, c.canvas.height)
    let vue = this
    this.points.forEach((p) => {
      p.computePoint(c, this.mouse.x, this.mouse.y)
      p.draw(c)
    })
    window.requestAnimationFrame(() => { vue.draw(c) })
  }
}

class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.origX = x
    this.origY = y
  }

  draw (c) {
    c.beginPath()
    c.fillStyle = 'white'
    c.arc(this.x, this.y, 5, 0, 2 * Math.PI)
    c.fill()
  }

  computePoint (c, mouseX, mouseY) {
    if (mouseX !== null) {
      const mx = mouseX * c.canvas.width
      const my = mouseY * c.canvas.height
      const distX = mx - this.origX
      const distY = my - this.origY

      const d = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
      const p = this.compute(d)

      // PERCENT
      this.x = (this.origX > this.mx) ? this.origX + (p * distX) : this.origX - (p * distX)
      this.y = (this.origY > this.my) ? this.origY + (p * distY) : this.origY - (p * distY)
    }
  }

  compute (d) {
    const MAX = 500
    if (d < MAX) {
      // const p = Math.cos(d / (MAX / 2))
      const p = 1 - ((1 / MAX) * d)
      return (p > 0) ? p : 0
    } else {
      return 0
    }
  }
}

export default test
