class Animator {
  constructor (input, output, duration) {
    // Duration is the number of Animation Frame done (this is not a time unit)
    this.input = input
    this.output = output
    this.duration = duration
    this.value = input
    this.count = duration
  }
  // EASE IN : function (t) { return t*t }
  iterate () {
    if (this.count > 0) {
      this.value += ((this.output - this.input) / this.duration)
      this.count--
      return (this.count === 0)
    } else {
      return false
    }
  }
  get () {
    if (this.count === 0) {
      return this.output
    } else {
      return this.value
    }
  }
}

export default Animator
