
type NavigationState = {
  status: "idle"| "loading" | "complete" | "failed";
  workspaces: Array<Navigation['workspace']> | [];
  activeWorkspace?: Navigation['workspace'];
  projects: Array<Navigation["project"]> | [];
  isSidebarOpen: boolean;
};

type Navigation = {
  workspace: ApiComponents["schemas"]["Workspace"];
  campaign: ApiComponents["schemas"]["Campaign"];
  project: ApiComponents["schemas"]["Project"];
}