
type WorkspaceState = {
  status: "idle"| "loading" | "complete" | "failed";
  ids: Array<string> | [];
  entities: Array<Component['workspace']> | [];
};