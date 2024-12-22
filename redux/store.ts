import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jobApi } from "./services/job";
import favoritesReducer from "./slice/favoriteSlice";
import { applicationApi } from "./services/application";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    favorites: favoritesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware, applicationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
