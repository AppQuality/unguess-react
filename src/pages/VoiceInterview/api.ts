const MASTRA_BASE =
  process.env.REACT_APP_MASTRA_API_URL || 'http://localhost:4111';
const API_BASE =
  process.env.REACT_APP_INTERVIEW_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:3010';

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

export interface InterviewClient {
  mintToken(language: string): Promise<RealtimeToken>;
  callTool(name: string, args: Record<string, unknown>): Promise<unknown>;
  uploadRecording(blob: Blob): Promise<void>;
}

// Local/dev: browser talks straight to the Mastra server (no invite token). Keeps the standalone
// demo working without running unguess-api.
const createMastraDirectClient = (): InterviewClient => {
  let interviewId: string | null = null;
  return {
    async mintToken(language: string): Promise<RealtimeToken> {
      const res = await fetch(`${MASTRA_BASE}/interview/realtime/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      });
      if (!res.ok) throw new Error(`realtime token failed: ${res.status}`);
      const token = (await res.json()) as RealtimeToken;
      interviewId = token.interviewId;
      return token;
    },
    async callTool(
      name: string,
      args: Record<string, unknown>
    ): Promise<unknown> {
      const path =
        name === 'endInterview'
          ? '/interview/tools/end-interview'
          : '/interview/tools/get-next-question';
      const res = await fetch(`${MASTRA_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...args, interviewId }),
      });
      if (!res.ok) throw new Error(`tool ${name} failed: ${res.status}`);
      return res.json();
    },
    async uploadRecording(blob: Blob): Promise<void> {
      if (!interviewId) return;
      const id = encodeURIComponent(interviewId);
      await fetch(`${MASTRA_BASE}/interview/recording/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': blob.type || 'application/octet-stream' },
        body: blob,
      });
      await fetch(`${MASTRA_BASE}/interview/recording/${id}/complete`, {
        method: 'POST',
      });
    },
  };
};

// Production: browser talks to unguess-api with a signed invite token; unguess-api proxies to
// Mastra and stores the recording in S3.
const createUnguessApiClient = (
  interviewId: string,
  token: string
): InterviewClient => {
  const base = `${API_BASE}/interviews/${encodeURIComponent(interviewId)}`;
  const jsonHeaders = {
    'Content-Type': 'application/json',
    public_interview_token: token,
  };
  return {
    async mintToken(language: string): Promise<RealtimeToken> {
      const res = await fetch(`${base}/realtime-token`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ language }),
      });
      if (!res.ok) throw new Error(`realtime token failed: ${res.status}`);
      return res.json() as Promise<RealtimeToken>;
    },
    async callTool(
      name: string,
      args: Record<string, unknown>
    ): Promise<unknown> {
      const path = name === 'endInterview' ? '/complete' : '/next-question';
      const res = await fetch(`${base}${path}`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(args),
      });
      if (!res.ok) throw new Error(`tool ${name} failed: ${res.status}`);
      return res.json();
    },
    async uploadRecording(blob: Blob): Promise<void> {
      const form = new FormData();
      form.append('file', blob, 'interview.webm');
      await fetch(`${base}/recording`, {
        method: 'POST',
        headers: { public_interview_token: token },
        body: form,
      });
    },
  };
};

// Local-testing helper: create an interview + invite token without auth (non-prod endpoint),
// so opening /interview with no token can bootstrap itself.
export const createDevInterview = async (
  language: string
): Promise<{ interviewId: string; token: string; language: string }> => {
  const res = await fetch(`${API_BASE}/interviews/dev-bootstrap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language }),
  });
  if (!res.ok) throw new Error(`dev-bootstrap failed: ${res.status}`);
  return res.json() as Promise<{
    interviewId: string;
    token: string;
    language: string;
  }>;
};

export const createInterviewClient = (opts?: {
  interviewId?: string;
  token?: string;
}): InterviewClient =>
  opts?.interviewId && opts?.token
    ? createUnguessApiClient(opts.interviewId, opts.token)
    : createMastraDirectClient();
