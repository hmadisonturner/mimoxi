export default class MimoxiAudio {
  constructor() {
    const context = new AudioContext();
    this.context = context;
    context.sampleRate = 1000;
    const mainGainNode = context.createGain();
    this.mainGainNode = mainGainNode;
    mainGainNode.connect(context.destination);
    mainGainNode.gain.value = 0.1;
  }
}
