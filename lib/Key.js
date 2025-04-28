import MimoxiControl from "./Control.js";

export default class MimoxiKey extends MimoxiControl {
  constructor(element, audioContext, frequency) {
    super(element);
    this.frequency = frequency;
    this.audio = audioContext;
  }

  play() {
    this.bright = true;
    this.sound();
  }

  sound() {
    if (this.oscillator) this.stop();
    this.oscillator = this.audio.createOscillator();
    this.oscillator.frequency.value = this.frequency;
    this.oscillator.connect(this.audio.destination);
    this.oscillator.start();
  }

  stop() {
    this.light = true;
    this.silence();
  }

  silence() {
    if (this.oscillator) this.oscillator.stop();
    delete this.oscillator;
  }

  get light() {
    return this.element.getAttribute("class") === "lit";
  }

  set light(flag) {
    this.element.setAttribute("class", "lit");
  }

  get bright() {
    return this.element.getAttribute("class") === "on";
  }

  set bright(flag) {
    this.element.setAttribute("class", "on");
  }

  get dim() {
    return !this.element.hasAttribute("class");
  }

  set dim(flag) {
    this.element.removeAttribute("class");
  }
}
