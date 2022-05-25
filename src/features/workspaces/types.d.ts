import { Workspace } from "../api";

type WorkspaceState = {
  status: 'idle' | 'loading' | 'complete' | 'failed';
  ids: Array<string> | [];
  entities: Array<Workspace> | [];
};
