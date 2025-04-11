import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { unguessApiSlice } from 'src/features/api/apiTags';
import { strapiSlice } from '../features/backoffice/strapi';
import bugsPageReducer from '../features/bugsPage/bugsPageSlice';
import filterReducer from '../features/campaignsFilter/campaignsFilterSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import planModulesReducer from '../features/planModules';
import userReducer from '../features/user/userSlice';
import uxFilterReducer from '../features/uxFilters';
import workspaceReducer from '../features/workspaces/workspaceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    workspaces: workspaceReducer,
    filters: filterReducer,
    bugsPage: bugsPageReducer,
    uxFilters: uxFilterReducer,
    planModules: planModulesReducer,
    [unguessApiSlice.reducerPath]: unguessApiSlice.reducer,
    [strapiSlice.reducerPath]: strapiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(unguessApiSlice.middleware)
      .concat(strapiSlice.middleware),
});

setupListeners(store.dispatch);
