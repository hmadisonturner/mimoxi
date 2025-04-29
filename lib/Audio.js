export default class MimoxiAudio {
  constructor() {
    const options = {
      latencyHint: "interactive",
      sampleRate: 16000,
    };
    const context = new AudioContext(options);
    this.context = context;
    const mainGainNode = context.createGain();
    this.mainGainNode = mainGainNode;
    mainGainNode.connect(context.destination);
  }
}
