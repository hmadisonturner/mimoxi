import MimoxiButton from './Button.js'
export default class MimoshiMuteButton extends MimoxiButton {
  set on (flag) {
    this.mimoxi.audio.resume()
    super.on = true
  }

  get on () { return this.on }

  set off (flag) {
    this.mimoxi.audio.suspend()
    super.off = true
  }

  get off () { return this.off }
}
