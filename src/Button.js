import MimoxiControl from './Control.js'

export default class MimoxiButton extends MimoxiControl {
  constructor (mimoxi, element) {
    super(mimoxi, element)
    this.element.style.visibility = 'visible'
    this.graphic = this.element
      .getElementsByTagName('g')[0]
    this.off = true
  }

  set on (flag) {
    this.unbindAll()
    this.bind('click', (event) => { this.off = true })
    this.graphic.setAttribute('class', 'on')
  }

  get on () {
    return this.graphic.hasAttribute('class')
  }

  set off (flag) {
    this.unbindAll()
    this.bind('click', (event) => { this.on = true })
    this.graphic.removeAttribute('class')
  }

  get off () {
    return !this.graphic.hasAttribute('class')
  }
}
