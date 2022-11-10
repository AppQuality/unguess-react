import { theme } from '@appquality/unguess-design-system';
import { createSlice } from '@reduxjs/toolkit';
import { isMinMedia } from 'src/common/utils';
import { NavigationState } from './types';

const initialState: NavigationState = {
  isSidebarOpen: isMinMedia(theme.breakpoints.sm),
  isProfileModalOpen: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setWorkspace: (state, action) => {
      state.activeWorkspace = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    toggleProfileModal: (state) => {
      state.isProfileModalOpen = !state.isProfileModalOpen;
    },
    setProfileModalOpen: (state, action) => {
      state.isProfileModalOpen = action.payload;
    },
  },
});

export const {
  setWorkspace,
  toggleSidebar,
  toggleProfileModal,
  setProfileModalOpen,
  closeSidebar,
} = navigationSlice.actions;

export default navigationSlice.reducer;
