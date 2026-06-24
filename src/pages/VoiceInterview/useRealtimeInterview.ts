import { useCallback, useEffect, useRef, useState } from 'react';
import { createInterviewClient, InterviewClient, InterviewTurn } from './api';

export type RealtimeStatus = 'idle' | 'connecting' | 'live' | 'ended' | 'error';

const OPENAI_CALLS_URL = 'https://api.openai.com/v1/realtime/calls';

const VIDEO_MIME_CANDIDATES = [
  'video/webm;codecs=vp8,opus',
  'video/webm',
  'video/mp4',
];

const supportedMime = (): string =>
  VIDEO_MIME_CANDIDATES.find(
    (m) =>
      typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)
  ) ?? '';

interface RealtimeEvent {
  type: string;
  [key: string]: unknown;
}

export const useRealtimeInterview = (opts?: {
  interviewId?: string;
  token?: string;
}) => {
  const [status, setStatus] = useState<RealtimeStatus>('idle');
  const [transcript, setTranscript] = useState<InterviewTurn[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const clientRef = useRef<InterviewClient | null>(null);
  const interviewIdRef = useRef('');
  const languageRef = useRef('it');
  const turnIdRef = useRef(0);

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

  const send = useCallback((event: Record<string, unknown>) => {
    const dc = dcRef.current;
    if (dc && dc.readyState === 'open') dc.send(JSON.stringify(event));
  }, []);

  const handleFunctionCall = useCallback(
    async (callId: string, name: string, argsJson: string) => {
      let output: unknown;
      try {
        const args = (argsJson ? JSON.parse(argsJson) : {}) as Record<
          string,
          unknown
        >;
        if (!args.interviewId) args.interviewId = interviewIdRef.current;
        if (!args.language) args.language = languageRef.current;
        output = (await clientRef.current?.callTool(name, args)) ?? {};
      } catch (e) {
        output = { error: e instanceof Error ? e.message : 'tool_error' };
      }
      send({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: callId,
          output: JSON.stringify(output),
        },
      });
      send({ type: 'response.create' });
    },
    [send]
  );

  const handleEvent = useCallback(
    (evt: RealtimeEvent) => {
      switch (evt.type) {
        case 'response.function_call_arguments.done':
          handleFunctionCall(
            String(evt.call_id),
            String(evt.name),
            String(evt.arguments ?? '')
          ).catch(() => undefined);
          break;
        case 'conversation.item.input_audio_transcription.completed':
          addTurn('user', String(evt.transcript ?? ''));
          break;
        case 'response.output_audio_transcript.done':
          addTurn('assistant', String(evt.transcript ?? ''));
          break;
        case 'output_audio_buffer.started':
          setSpeaking(true);
          break;
        case 'output_audio_buffer.stopped':
        case 'response.done':
          setSpeaking(false);
          break;
        default:
          break;
      }
    },
    [addTurn, handleFunctionCall]
  );

  const startCombinedRecording = useCallback(
    (localStream: MediaStream, agentStream: MediaStream) => {
      if (recorderRef.current) return;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      ctx.resume().catch(() => undefined);
      const dest = ctx.createMediaStreamDestination();
      ctx.createMediaStreamSource(localStream).connect(dest); // candidate mic
      ctx.createMediaStreamSource(agentStream).connect(dest); // Katia's voice
      const [videoTrack] = localStream.getVideoTracks();
      const combined = new MediaStream(
        videoTrack
          ? [videoTrack, ...dest.stream.getAudioTracks()]
          : dest.stream.getAudioTracks()
      );
      const mimeType = supportedMime();
      const recorder = new MediaRecorder(
        combined,
        mimeType ? { mimeType } : undefined
      );
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || 'video/webm',
        });
        setDownloadUrl(URL.createObjectURL(blob));
        clientRef.current?.uploadRecording(blob).catch(() => undefined);
      };
      recorder.start(2000);
      recorderRef.current = recorder;
    },
    []
  );

  const start = useCallback(
    async (language: string) => {
      setError(null);
      setStatus('connecting');
      setTranscript([]);
      setDownloadUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      languageRef.current = language;
      try {
        const client = createInterviewClient({
          interviewId: opts?.interviewId,
          token: opts?.token,
        });
        clientRef.current = client;
        const token = await client.mintToken(language);
        interviewIdRef.current = token.interviewId;
        languageRef.current = token.language;

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection();
        pcRef.current = pc;
        const audioEl = new Audio();
        audioEl.autoplay = true;
        audioElRef.current = audioEl;
        pc.ontrack = (e) => {
          const [agentStream] = e.streams;
          audioEl.srcObject = agentStream; // user hears Katie
          startCombinedRecording(stream, agentStream); // record both sides
        };
        const [audioTrack] = stream.getAudioTracks();
        pc.addTrack(audioTrack, stream);

        const dc = pc.createDataChannel('oai-events');
        dcRef.current = dc;
        dc.addEventListener('message', (e) => {
          try {
            handleEvent(JSON.parse(e.data));
          } catch {
            /* ignore malformed event */
          }
        });
        dc.addEventListener('open', () => {
          setStatus('live');
          send({ type: 'response.create' });
        });

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        const sdpRes = await fetch(OPENAI_CALLS_URL, {
          method: 'POST',
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/sdp',
          },
        });
        if (!sdpRes.ok) {
          throw new Error(`realtime connect failed: ${sdpRes.status}`);
        }
        await pc.setRemoteDescription({
          type: 'answer',
          sdp: await sdpRes.text(),
        });
        // Recording starts from pc.ontrack once the agent's audio track arrives.
      } catch (e) {
        setError(e instanceof Error ? e.message : 'media_error');
        setStatus('error');
      }
    },
    [handleEvent, send, startCombinedRecording, opts?.interviewId, opts?.token]
  );

  const end = useCallback(async () => {
    if (recorderRef.current?.state !== 'inactive') recorderRef.current?.stop();
    dcRef.current?.close();
    pcRef.current?.close();
    audioCtxRef.current?.close().catch(() => undefined);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setSpeaking(false);
    setStatus('ended');
  }, []);

  return {
    status,
    transcript,
    speaking,
    error,
    downloadUrl,
    videoRef,
    start,
    end,
  };
};
