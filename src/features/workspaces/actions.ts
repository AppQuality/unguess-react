import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'src/common/api';
import { Workspace } from '../api';
import { GET_WORKSPACES } from './actions.types';

export const getWorkspaces = createAsyncThunk(GET_WORKSPACES, async () => {
  const workspaces = await API.workspaces(undefined, {
    orderBy: 'company',
  });
  return workspaces.items as Workspace[];
});
