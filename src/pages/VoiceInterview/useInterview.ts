import { useCallback, useEffect, useRef, useState } from 'react';
import {
  completeRecording,
  generateReply,
  InterviewTurn,
  synthesize,
  transcribe,
  uploadRecordingChunk,
} from './api';

export type InterviewStatus =
  | 'idle'
  | 'connecting'
  | 'active'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'ended'
  | 'error';

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

const playAudio = (blob: Blob): Promise<void> =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    const done = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    audio.onended = done;
    audio.onerror = done;
    audio.play().catch(done);
  });

export const useInterview = () => {
  const [status, setStatus] = useState<InterviewStatus>('idle');
  const [transcript, setTranscript] = useState<InterviewTurn[]>([]);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const webcamRecorderRef = useRef<MediaRecorder | null>(null);
  const sttRecorderRef = useRef<MediaRecorder | null>(null);
  const interviewIdRef = useRef<string>('');
  const languageRef = useRef<string>('it');

  // Keep the preview wired to the live stream whenever both are present.
  useEffect(() => {
    const video = videoRef.current;
    const stream = streamRef.current;
    if (video && stream && video.srcObject !== stream) {
      video.srcObject = stream;
    }
  });

  const turnIdRef = useRef(0);

  const addTurn = useCallback((role: InterviewTurn['role'], text: string) => {
    turnIdRef.current += 1;
    const id = turnIdRef.current;
    setTranscript((prev) => [...prev, { id, role, text }]);
  }, []);

  const runAgentTurn = useCallback(
    async (userText: string) => {
      setStatus('thinking');
      const reply = await generateReply(
        interviewIdRef.current,
        languageRef.current,
        userText
      );
      if (reply) {
        addTurn('assistant', reply);
        setStatus('speaking');
        await playAudio(await synthesize(reply));
      }
      setStatus('active');
    },
    [addTurn]
  );

  const handleUserAudio = useCallback(
    async (blob: Blob) => {
      setStatus('thinking');
      const text = await transcribe(blob);
      if (!text.trim()) {
        setStatus('active');
        return;
      }
      addTurn('user', text);
      await runAgentTurn(text);
    },
    [addTurn, runAgentTurn]
  );

  const start = useCallback(
    async (language: string) => {
      setError(null);
      setStatus('connecting');
      setTranscript([]);
      interviewIdRef.current =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `iv_${Date.now()}`;
      languageRef.current = language;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;

        const mimeType = supportedMime();
        const webcamRecorder = new MediaRecorder(
          stream,
          mimeType ? { mimeType } : undefined
        );
        const id = interviewIdRef.current;
        webcamRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            uploadRecordingChunk(id, e.data).catch(() => undefined);
          }
        };
        webcamRecorder.start(2000);
        webcamRecorderRef.current = webcamRecorder;

        await runAgentTurn('start');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'media_error');
        setStatus('error');
      }
    },
    [runAgentTurn]
  );

  const startListening = useCallback(() => {
    const stream = streamRef.current;
    if (!stream || status === 'thinking' || status === 'speaking') return;
    const audioStream = new MediaStream(stream.getAudioTracks());
    const recorder = new MediaRecorder(audioStream);
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, {
        type: recorder.mimeType || 'audio/webm',
      });
      handleUserAudio(blob).catch((e) =>
        setError(e instanceof Error ? e.message : 'listen_error')
      );
    };
    sttRecorderRef.current = recorder;
    recorder.start();
    setStatus('listening');
  }, [status, handleUserAudio]);

  const stopListening = useCallback(() => {
    if (sttRecorderRef.current?.state === 'recording') {
      sttRecorderRef.current.stop();
    }
  }, []);

  const end = useCallback(async () => {
    if (sttRecorderRef.current?.state === 'recording') {
      sttRecorderRef.current.stop();
    }
    if (webcamRecorderRef.current?.state !== 'inactive') {
      webcamRecorderRef.current?.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (interviewIdRef.current) {
      await completeRecording(interviewIdRef.current).catch(() => undefined);
    }
    setStatus('ended');
  }, []);

  return {
    status,
    transcript,
    error,
    videoRef,
    start,
    startListening,
    stopListening,
    end,
  };
};
