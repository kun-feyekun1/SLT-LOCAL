import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import { authReducer } from "@/features/auth/state/authSlice";
import { locationReducer } from "@/features/location/state/locationSlice";
import { mapReducer } from "@/features/map/state/mapSlice";
import { routeReducer } from "@/features/routes/state/routeSlice";
import { themeReducer } from "@/features/theme/state/themeSlice";
import { toastReducer } from "@/features/toast/state/toastSlice";
import { transportReducer } from "@/features/transport/state/transportSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  toast: toastReducer,
  transport: transportReducer,
  route: routeReducer,
  map: mapReducer,
  location: locationReducer,
});

const persistConfig = {
  key: "derash-root",

  // AsyncStorage for React Native.
  // sessionStorage fallback for web.
  storage:
    Platform.OS === "web"
      ? require("redux-persist/lib/storage/session").default
      : AsyncStorage,

  whitelist: [
    "auth",
    "theme",
    "transport",
    "route",
    // Add "location" only if you intentionally want
    // location state persisted between app launches.
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
