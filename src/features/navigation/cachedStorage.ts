const WORKSPACE_KEY = "unguess_ws";

export const getWorkspaceFromLS = (): NavigationState["activeWorkspace"] => {
  const ws = localStorage.getItem(WORKSPACE_KEY);
  return ws ? JSON.parse(ws) : false;
};

export const saveWorkspaceToLs = (workspace: Component["workspace"]): void => {
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
};
