/**
 * Implements a timed sequence of behaviors.
 */
class MimoxiMelody {
  /**
   * Create a MimoxiMelody.
   * @param {Array<Function>} notes - The behaviors to run.
   * @param {number} tempo - The interval at which to execute notes in bpm (beats per minute).
   */
  constructor (notes, tempo) {
    this.notes = notes
    this.interval = 1000 / (tempo / 60)
    this.sequencer = null
    this.counter = 0
  }
  /**
   * Start running the melody.
   */
  play () {
    if (!this.sequencer) {
      this.sequencer = setInterval(() => this.play(), this.interval)
    }
    else {
      this.notes[this.counter]()
      this.counter++
      if (this.counter === this.notes.length) {
        this.stop()
      }
    }
  }
  /**
   * Stop playback, keeping the playback counter in place. A subsequent invocation of play() will start playback where it previously left off.
   */
  stop () {
    clearInterval(this.sequencer)
    this.sequencer = null
  }
  /** Reset the playback counter to the beginning of the melody and, if the melody is playing, stop.
   */
  reset () {
    this.stop()
    this.counter = 0
  }
}
export default MimoxiMelody
