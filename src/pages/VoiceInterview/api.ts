const MASTRA_BASE =
  process.env.REACT_APP_MASTRA_API_URL || 'http://localhost:4111';

export interface InterviewTurn {
  id: number;
  role: 'assistant' | 'user';
  text: string;
}

export interface RealtimeToken {
  value: string;
  expiresAt: number;
  model: string;
  interviewId: string;
  language: string;
}

export const getRealtimeToken = async (
  language: string,
  interviewId?: string
): Promise<RealtimeToken> => {
  const res = await fetch(`${MASTRA_BASE}/interview/realtime/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language, interviewId }),
  });
  if (!res.ok) throw new Error(`realtime token failed: ${res.status}`);
  return res.json() as Promise<RealtimeToken>;
};

export const callTool = async (
  name: string,
  args: Record<string, unknown>
): Promise<unknown> => {
  const path =
    name === 'endInterview'
      ? '/interview/tools/end-interview'
      : '/interview/tools/get-next-question';
  const res = await fetch(`${MASTRA_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`tool ${name} failed: ${res.status}`);
  return res.json();
};

export const uploadRecordingChunk = async (
  interviewId: string,
  chunk: Blob
): Promise<void> => {
  await fetch(
    `${MASTRA_BASE}/interview/recording/${encodeURIComponent(interviewId)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': chunk.type || 'application/octet-stream' },
      body: chunk,
    }
  );
};

export const completeRecording = async (interviewId: string): Promise<void> => {
  await fetch(
    `${MASTRA_BASE}/interview/recording/${encodeURIComponent(
      interviewId
    )}/complete`,
    { method: 'POST' }
  );
};
