import { RootState } from 'src/app/types';
import { workspaceAdapter } from './workspaceSlice';

export const { selectAll: selectWorkspaces, selectById: selectWorkspaceById } =
  workspaceAdapter.getSelectors((state: RootState) => state.workspaces);
