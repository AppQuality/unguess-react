import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import navigationReducer from "../features/navigation/navigationSlice";
import workspaceReducer from "../features/workspaces/workspaceSlice";
import filterReducer from "../features/campaignsFilter/campaignsFilterSlice";
import expressReducer from "../features/express/expressSlice";
import { apiSlice } from "../features/api/api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    workspaces: workspaceReducer,
    filters: filterReducer,
    express: expressReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
