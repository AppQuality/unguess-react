import { RootState } from "src/app/store";

export const selectActiveWorkspace = (state: RootState) => state.navigation.activeWorkspace;