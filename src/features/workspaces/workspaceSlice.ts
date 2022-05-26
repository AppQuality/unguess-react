import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Workspace } from '../api';
import { getWorkspaces } from './actions';

const workspaceAdapter = createEntityAdapter<Workspace>();

const initialState = workspaceAdapter.getInitialState({
  status: 'idle',
});

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkspaces.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWorkspaces.fulfilled, (state, action) => {
        state.status = 'complete';
        workspaceAdapter.setAll(state, action.payload);
      })
      .addCase(getWorkspaces.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default workspaceSlice.reducer;

// export const { selectAll: selectWorkspaces, selectById: selectWorkspaceById } =
//   workspaceAdapter.getSelectors((state: RootState) => state.workspaces);
