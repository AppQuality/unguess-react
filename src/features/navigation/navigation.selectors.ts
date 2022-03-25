import { RootState } from "src/app/store";

export const selectWorkspaces = (state: RootState) => state.navigation.workspaces;

export const selectActiveWorkspace = (state: RootState) => state.navigation.activeWorkspace;