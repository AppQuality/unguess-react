import * as authenticate from "./authenticate";
import * as users from "./users";
import * as projects from "./projects";

const API = {
  ...authenticate,
  ...users,
  ...projects,
};

export default API;
