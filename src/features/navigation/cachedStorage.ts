const WORKSPACE_KEY = "unguess_ws";

export const getWorkspaceFromLS = (): NavigationState["workspaces"] => {
  const ws = localStorage.getItem(WORKSPACE_KEY);
  return ws ? [JSON.parse(ws)] : [];
};

export const saveWorkspaceToLs = (workspace: Navigation["workspace"]): void => {
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
};
