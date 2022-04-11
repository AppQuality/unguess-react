
type ProjectState = {
  status: "idle"| "loading" | "complete" | "failed";
  projects: Array<Component['project']> | [];
};