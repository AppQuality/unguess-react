import * as authenticate from "./authenticate";
import * as users from "./users";

const API = {
  ...authenticate,
  ...users,
};

export default API;
