import { useCallback, useEffect, useRef, useState } from 'react';
import { InterviewTurn } from './api';

export type RealtimeStatus = 'idle' | 'connecting' | 'live' | 'ended' | 'error';

const API_BASE =
  process.env.REACT_APP_INTERVIEW_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:3010';
const WS_BASE = API_BASE.replace(/^http/, 'ws'); // http->ws, https->wss

interface BridgeMessage {
  type: string;
  [key: string]: unknown;
}

// Server-side realtime: browser <-> unguess-api (/realtime WS) <-> OpenAI. Audio is PCM16 @ 24kHz
// over the WS; the AudioContext runs at 24kHz so the browser handles mic resampling.
export const useRealtimeWsInterview = (opts?: {
  interviewId?: string;
  token?: string;
}) => {
  const [status, setStatus] = useState<RealtimeStatus>('idle');
  const [transcript, setTranscript] = useState<InterviewTurn[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [micLevel, setMicLevel] = useState(0);
  const [mics, setMics] = useState<{ deviceId: string; label: string }[]>([]);
  const downloadUrl: string | null = null; // server-side recording: later phase

  const videoRef = useRef<HTMLVideoElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const playbackRef = useRef<AudioWorkletNode | null>(null);
  const turnIdRef = useRef(0);
  const speakTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (video && stream && video.srcObject !== stream) {
      video.srcObject = stream;
    }
  });

  const addTurn = useCallback((role: InterviewTurn['role'], text: string) => {
    if (!text.trim()) return;
    turnIdRef.current += 1;
    const id = turnIdRef.current;
    setTranscript((prev) => [...prev, { id, role, text }]);
  }, []);

  const refreshMics = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    try {
      const probe = await navigator.mediaDevices.getUserMedia({ audio: true });
      probe.getTracks().forEach((track) => track.stop());
    } catch {
      /* permission denied / busy */
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    setMics(
      devices
        .filter((d) => d.kind === 'audioinput')
        .map((d) => ({ deviceId: d.deviceId, label: d.label || 'Microphone' }))
    );
  }, []);

  const markSpeaking = useCallback(() => {
    setSpeaking(true);
    if (speakTimerRef.current) window.clearTimeout(speakTimerRef.current);
    speakTimerRef.current = window.setTimeout(() => setSpeaking(false), 400);
  }, []);

  const start = useCallback(
    async (language: string, micDeviceId?: string) => {
      setError(null);
      setStatus('connecting');
      setTranscript([]);
      try {
        if (!opts?.token || !opts?.interviewId) {
          throw new Error('missing interview token');
        }
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error(
            'mediaDevices unavailable — use http://localhost or https'
          );
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: micDeviceId ? { deviceId: { exact: micDeviceId } } : true,
        });
        try {
          const cam = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          cam.getVideoTracks().forEach((track) => stream.addTrack(track));
        } catch {
          /* audio-only */
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        const ctx = new AudioContext({ sampleRate: 24000 });
        ctxRef.current = ctx;
        await ctx.resume().catch(() => undefined);
        await ctx.audioWorklet.addModule('/interview-capture-worklet.js');
        await ctx.audioWorklet.addModule('/interview-playback-worklet.js');

        const playback = new AudioWorkletNode(ctx, 'interview-playback', {
          outputChannelCount: [1],
        });
        playback.connect(ctx.destination);
        playbackRef.current = playback;

        const ws = new WebSocket(
          `${WS_BASE}/realtime?token=${encodeURIComponent(opts.token)}`
        );
        ws.binaryType = 'arraybuffer';
        wsRef.current = ws;
        ws.onmessage = (e) => {
          if (typeof e.data === 'string') {
            let m: BridgeMessage;
            try {
              m = JSON.parse(e.data) as BridgeMessage;
            } catch {
              return;
            }
            if (m.type === 'status' && m.status === 'connected') {
              setStatus('live');
            } else if (m.type === 'transcript') {
              addTurn(
                m.role === 'user' ? 'user' : 'assistant',
                String(m.text ?? '')
              );
            } else if (m.type === 'speech_started') {
              playbackRef.current?.port.postMessage({ type: 'clear' });
              setSpeaking(false);
            } else if (m.type === 'error') {
              setError(
                typeof m.error === 'string' ? m.error : 'realtime_error'
              );
            }
            return;
          }
          // binary PCM16 from the agent
          playbackRef.current?.port.postMessage(e.data);
          markSpeaking();
        };
        ws.onerror = () => setError('ws_error');
        ws.onclose = () => setStatus((s) => (s === 'error' ? s : 'ended'));

        const micSource = ctx.createMediaStreamSource(
          new MediaStream(stream.getAudioTracks())
        );
        const capture = new AudioWorkletNode(ctx, 'interview-capture');
        const zero = ctx.createGain();
        zero.gain.value = 0;
        micSource.connect(capture);
        capture.connect(zero);
        zero.connect(ctx.destination); // keep the capture node pulled, silently
        let frameCount = 0;
        capture.port.onmessage = (e: MessageEvent<ArrayBuffer>) => {
          const buf = e.data;
          if (ws.readyState === WebSocket.OPEN) ws.send(buf);
          frameCount += 1;
          if (frameCount % 3 === 0) {
            const i16 = new Int16Array(buf);
            const sum = i16.reduce((acc, v) => {
              const x = v / 0x8000;
              return acc + x * x;
            }, 0);
            setMicLevel(Math.min(1, Math.sqrt(sum / i16.length) * 4));
          }
        };
      } catch (e) {
        const err = e as { name?: string; message?: string };
        setError(
          err?.name
            ? `${err.name}: ${err.message ?? ''}`
            : err?.message || 'media_error'
        );
        setStatus('error');
      }
    },
    [opts?.interviewId, opts?.token, addTurn, markSpeaking]
  );

  const end = useCallback(async () => {
    wsRef.current?.close();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    await ctxRef.current?.close().catch(() => undefined);
    if (speakTimerRef.current) window.clearTimeout(speakTimerRef.current);
    setSpeaking(false);
    setMicLevel(0);
    setStatus('ended');
  }, []);

  return {
    status,
    transcript,
    speaking,
    error,
    downloadUrl,
    micLevel,
    mics,
    refreshMics,
    videoRef,
    start,
    end,
  };
};
