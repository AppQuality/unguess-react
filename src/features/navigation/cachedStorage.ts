import { Workspace } from '../api';

const WORKSPACE_KEY = 'unguess_ws';

export const getWorkspaceFromLS = (): Workspace | false => {
  const ws = localStorage.getItem(WORKSPACE_KEY);
  try {
    return JSON.parse(ws || 'invalid');
  } catch (e) {
    return false;
  }
};

export const saveWorkspaceToLs = (workspace: Workspace): void => {
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
};
