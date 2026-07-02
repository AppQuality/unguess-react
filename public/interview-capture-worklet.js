// Mic capture worklet. The AudioContext runs at 24 kHz, so the browser already resampled the mic;
// here we just convert Float32 -> PCM16 and post ~50ms frames to the main thread (which sends them
// over the WebSocket to the server bridge -> OpenAI Realtime).
const FRAME = 1200; // 50ms @ 24kHz

class CaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._buf = new Int16Array(FRAME);
    this._n = 0;
  }

  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (ch) {
      for (let i = 0; i < ch.length; i += 1) {
        let s = ch[i];
        if (s > 1) s = 1;
        else if (s < -1) s = -1;
        this._buf[this._n] = s < 0 ? s * 0x8000 : s * 0x7fff;
        this._n += 1;
        if (this._n >= FRAME) {
          this.port.postMessage(this._buf.buffer.slice(0));
          this._n = 0;
        }
      }
    }
    return true;
  }
}

registerProcessor('interview-capture', CaptureProcessor);
