export * from "../features/theme/state/themeSlice";
export * from "../features/toast/state/toastSlice";
export * from "./hooks";
export * from "./store";

// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/state/authSlice";
import { locationReducer } from "@/features/location/state/locationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
