// Agent audio playback worklet. Receives PCM16 ArrayBuffers (24 kHz mono) from the main thread,
// queues them, and plays them out continuously (silence when the queue is empty). A {type:"clear"}
// message flushes the queue for barge-in.
class PlaybackProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._queue = [];
    this._cur = null;
    this._pos = 0;
    this.port.onmessage = (e) => {
      const d = e.data;
      if (d && d.type === 'clear') {
        this._queue = [];
        this._cur = null;
        this._pos = 0;
        return;
      }
      const i16 = new Int16Array(d);
      const f32 = new Float32Array(i16.length);
      for (let i = 0; i < i16.length; i += 1) f32[i] = i16[i] / 0x8000;
      this._queue.push(f32);
    };
  }

  process(_inputs, outputs) {
    const out = outputs[0][0];
    let i = 0;
    while (i < out.length) {
      if (!this._cur) {
        this._cur = this._queue.shift() || null;
        this._pos = 0;
        if (!this._cur) {
          while (i < out.length) {
            out[i] = 0;
            i += 1;
          }
          break;
        }
      }
      out[i] = this._cur[this._pos];
      i += 1;
      this._pos += 1;
      if (this._pos >= this._cur.length) this._cur = null;
    }
    return true;
  }
}

registerProcessor('interview-playback', PlaybackProcessor);
