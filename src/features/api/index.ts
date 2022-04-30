import * as campaigns from "./endpoints/campaigns";
import * as projects from "./endpoints/projects";
import * as users from "./endpoints/users";
import * as workspaces from "./endpoints/workspaces";

export const API = {
  ...campaigns,
  ...projects,
  ...users,
  ...workspaces,
};