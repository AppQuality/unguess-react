import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import navigationReducer from "../features/navigation/navigationSlice";
import campaignReducer from "../features/campaigns/campaignSlice";
import projectReducer from "../features/projects/projectSlice";
import workspaceReducer from "../features/workspaces/workspaceSlice";
import filterReducer from "../features/campaignsFilter/campaignsFilterSlice";
// import { api } from "../services/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    campaigns: campaignReducer,
    projects: projectReducer,
    workspaces: workspaceReducer,
    filters: filterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
