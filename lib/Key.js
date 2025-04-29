import MimoxiControl from "./Control.js";

export default class MimoxiKey extends MimoxiControl {
  constructor(element, audio, frequency) {
    super(element);
    this.frequency = frequency;
    this.audio = audio;
  }

  play() {
    this.bright = true;
    this.sound();
  }

  sound() {
    this.oscillator = this.audio.context.createOscillator();
    this.oscillator.frequency.value = this.frequency;
    const gainNode = this.audio.mainGainNode;
    this.oscillator.connect(gainNode);
    gainNode.gain.value = 0;
    this.oscillator.start();
    gainNode.gain.linearRampToValueAtTime(
      0.2,
      this.audio.context.currentTime + 0.1
    );
  }

  stop() {
    this.light = true;
    this.silence();
  }

  silence() {
    this.audio.mainGainNode.gain.linearRampToValueAtTime(
      0,
      this.audio.context.currentTime + 0.1
    );
    this.oscillator.stop(this.audio.context.currentTime + 0.2);
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
