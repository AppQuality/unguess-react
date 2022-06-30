import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userReducer from '../features/user/userSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import workspaceReducer from '../features/workspaces/workspaceSlice';
import filterReducer from '../features/campaignsFilter/campaignsFilterSlice';
import expressReducer from '../features/express/expressSlice';
import { apiSlice } from '../features/api/api';
import { strapiSlice } from '../features/backoffice/strapi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    workspaces: workspaceReducer,
    filters: filterReducer,
    express: expressReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [strapiSlice.reducerPath]: strapiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(strapiSlice.middleware),
});

setupListeners(store.dispatch);
