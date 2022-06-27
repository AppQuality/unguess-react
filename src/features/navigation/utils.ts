import { RootState } from 'src/app/store';
import { Workspace } from '../api';

export const selectActiveWorkspace = (state: RootState) =>
  state.navigation.activeWorkspace;

export const isValidWorkspace = (
  workspace: Workspace,
  workspaces: Workspace[]
) => {
  const workspaceExists = workspaces.find((ws) => ws.id === workspace.id);

  return workspaceExists;
};
