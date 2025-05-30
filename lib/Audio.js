export default class MimoxiAudio {
  constructor() {
    const options = {
      latencyHint: "interactive",
      sampleRate: 16000,
    };
    const context = new AudioContext(options);
    const mainGainNode = context.createGain();
    this.context = context;
    this.mainGainNode = mainGainNode;
    mainGainNode.connect(context.destination);
    context.suspend();
  }
}
