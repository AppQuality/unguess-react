import { theme } from "@appquality/unguess-design-system";
import { createSlice } from "@reduxjs/toolkit";

import { getWorkspaceFromLS } from "./cachedStorage";

const cachedWorkspace = getWorkspaceFromLS() || undefined;

const initialState: NavigationState = {
  activeWorkspace: cachedWorkspace,
  isSidebarOpen: window.matchMedia(`only screen and (min-width: ${theme.breakpoints.sm})`).matches,
  isProfileModalOpen: false,
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
    },
    toggleProfileModal: (state) => {
      state.isProfileModalOpen = !state.isProfileModalOpen;
    },
    setProfileModalOpen: (state, action) => {
      state.isProfileModalOpen = action.payload;
    },
  },
});

export const { setWorkspace, toggleSidebar, toggleProfileModal, setProfileModalOpen } = navigationSlice.actions;

export default navigationSlice.reducer;