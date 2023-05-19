import { Workspace } from '../api';

type NavigationState = {
  isSidebarOpen: boolean;
  activeWorkspace?: Workspace;
  isProfileModalOpen: boolean;
  permissionSettingsTitle?: string;
  campaignId?: number;
  projectId?: number;
};
