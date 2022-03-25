import { createSlice } from "@reduxjs/toolkit";
import { getProjects, getWorkspaces } from "./actions";
import { getWorkspaceFromLS } from "./cachedStorage";

const cachedWorkspaces = getWorkspaceFromLS();

const initialState: NavigationState = {
  status: "idle",
  workspaces: cachedWorkspaces,
  ...(cachedWorkspaces.length && { activeWorkspace: cachedWorkspaces[0] }),
  projects: [],
  isSidebarOpen: true,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setWorkspace: (state, action) => {
      state.activeWorkspace = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProjects.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.status = "complete";
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(getWorkspaces.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getWorkspaces.fulfilled, (state, action) => {
      state.workspaces = action.payload;
      if (action.payload.length ){
        if(state.activeWorkspace !== undefined) {
          const activeWs = state.activeWorkspace as Navigation["workspace"];
          let wsIndex = action.payload.findIndex(ws => ws.id === activeWs.id);
          state.activeWorkspace = wsIndex > -1 ? action.payload[wsIndex] : action.payload[0];
        }else
        {
          state.activeWorkspace = action.payload[0];
        }
        
      }else
      {
        state.activeWorkspace = undefined;
      }
      state.status = "complete";
    });
    builder.addCase(getWorkspaces.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const { setWorkspace, toggleSidebar } = navigationSlice.actions;

export default navigationSlice.reducer;
