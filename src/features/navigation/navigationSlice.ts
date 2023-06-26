import { appTheme } from 'src/app/theme';
import { createSlice } from '@reduxjs/toolkit';
import { isMinMedia } from 'src/common/utils';
import { NavigationState } from './types';

const initialState: NavigationState = {
  isSidebarOpen: isMinMedia(appTheme.breakpoints.sm),
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
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    toggleProfileModal: (state) => {
      state.isProfileModalOpen = !state.isProfileModalOpen;
    },
    setProfileModalOpen: (state, action) => {
      state.isProfileModalOpen = action.payload;
    },
    setPermissionSettingsTitle: (state, action) => {
      state.permissionSettingsTitle = action.payload;
    },
    setCampaignId: (state, action) => {
      state.campaignId = action.payload;
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
  },
});

export const {
  setWorkspace,
  toggleSidebar,
  toggleProfileModal,
  setProfileModalOpen,
  closeSidebar,
  setSidebarOpen,
  setPermissionSettingsTitle,
  setCampaignId,
  setProjectId,
} = navigationSlice.actions;

export default navigationSlice.reducer;
