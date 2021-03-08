export default class
MimoxiKey {
  constructor (mimoxi, element, frequency) {
    this.element = element
    this.frequency = frequency
    this.mimoxi = mimoxi
  }

  play () {
    this.bright = true
    this.sound()
  }

  sound () {
    if (this.oscillator) this.stop()
    this.oscillator = this.mimoxi.audio
      .createOscillator()
    this.oscillator.frequency.value = this.frequency
    this.oscillator.connect(this.mimoxi.audio
      .destination)
    this.oscillator.start()
  }

  stop () {
    this.light = true
    this.silence()
  }

  silence () {
    if (this.oscillator) this.oscillator.stop()
    delete this.oscillator
  }

  get light () {
    return this.element.getAttribute('class') ===
          'lit'
  }

  set light (flag) {
    this.element.setAttribute('class', 'lit')
  }

  get bright () {
    return this.element.getAttribute('class') ===
          'on'
  }

  set bright (flag) {
    this.element.setAttribute('class', 'on')
  }

  get dim () {
    return !(this.element.hasAttribute('class'))
  }

  set dim (flag) {
    this.element.removeAttribute('class')
  }
}
