import * as users from './users';
import * as campaigns from './campaigns';
import * as projects from './projects';

const API = {
  ...users,
  ...campaigns,
  ...projects,
};

export default API;
