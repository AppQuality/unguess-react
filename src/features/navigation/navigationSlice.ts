import { createSlice } from "@reduxjs/toolkit";
import { getWorkspaceFromLS } from "./cachedStorage";

const cachedWorkspace = getWorkspaceFromLS() || undefined;

const initialState: NavigationState = {
  activeWorkspace: cachedWorkspace,
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
});

export const { setWorkspace, toggleSidebar } = navigationSlice.actions;

export default navigationSlice.reducer;
