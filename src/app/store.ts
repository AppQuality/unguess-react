import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import navigationReducer from "../features/navigation/navigationSlice";
import campaignReducer from "../features/campaigns/campaignSlice";
// import { api } from "../services/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    campaigns: campaignReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
