import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { unguessApiSlice } from 'src/features/api/apiTags';
import userReducer from '../features/user/userSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import workspaceReducer from '../features/workspaces/workspaceSlice';
import filterReducer from '../features/campaignsFilter/campaignsFilterSlice';
import expressReducer from '../features/express/expressSlice';
import { strapiSlice } from '../features/backoffice/strapi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    workspaces: workspaceReducer,
    filters: filterReducer,
    express: expressReducer,
    [unguessApiSlice.reducerPath]: unguessApiSlice.reducer,
    [strapiSlice.reducerPath]: strapiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(unguessApiSlice.middleware)
      .concat(strapiSlice.middleware),
});

setupListeners(store.dispatch);
