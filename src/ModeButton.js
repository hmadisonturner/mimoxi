import MimoxiButton from './Button.js'

export default class MimoshiModeButton extends MimoxiButton {
  set on (flag) {
    this.mimoxi.hello()
    super.on = true
  }

  get on () {
    return this.on
  }
}
