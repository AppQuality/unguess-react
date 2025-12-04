// TODO: we need to find a way to export Step type from backend
export type Step = {
  suspendPayload?: { message?: string };
  output?: { message?: string };
  input?: { reasoning?: string };
  name: string;
};
