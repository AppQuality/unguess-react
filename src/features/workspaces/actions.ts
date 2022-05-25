import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_WORKSPACES } from './actions.types';
import API from 'src/common/api';

export const getWorkspaces = createAsyncThunk(GET_WORKSPACES, async () => {
  const workspaces = await API.workspaces();
  return workspaces.items as ApiComponents['schemas']['Workspace'][];
});
