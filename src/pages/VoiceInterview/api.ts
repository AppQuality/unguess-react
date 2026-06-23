const MASTRA_BASE =
  process.env.REACT_APP_MASTRA_API_URL || 'http://localhost:4111';

const AGENT_ID = 'interview_agent';

export interface InterviewTurn {
  id: number;
  role: 'assistant' | 'user';
  text: string;
}

export const generateReply = async (
  interviewId: string,
  language: string,
  userText: string
): Promise<string> => {
  const res = await fetch(`${MASTRA_BASE}/api/agents/${AGENT_ID}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: userText }],
      memory: { resource: `interview_${interviewId}`, thread: interviewId },
      requestContext: {
        interview_id: interviewId,
        interview_language: language,
      },
    }),
  });
  if (!res.ok) throw new Error(`generate failed: ${res.status}`);
  const data = (await res.json()) as { text?: string };
  return data.text ?? '';
};

export const synthesize = async (text: string): Promise<Blob> => {
  const res = await fetch(`${MASTRA_BASE}/interview/speak`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`speak failed: ${res.status}`);
  return res.blob();
};

export const transcribe = async (audio: Blob): Promise<string> => {
  const res = await fetch(`${MASTRA_BASE}/interview/listen`, {
    method: 'POST',
    headers: { 'Content-Type': audio.type || 'audio/webm' },
    body: audio,
  });
  if (!res.ok) throw new Error(`listen failed: ${res.status}`);
  const data = (await res.json()) as { text?: string };
  return data.text ?? '';
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
