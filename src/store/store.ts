// import { authReducer } from "@/features/auth/state/authSlice";
// import { locationReducer } from "@/features/location/state/locationSlice";
// import { mapReducer } from "@/features/map/state/mapSlice";
// import { onboardingReducer } from "@/features/onboarding/state/onboardingSlice";
// import { routeReducer } from "@/features/routes/state/routeSlice";
// import { themeReducer } from "@/features/theme/state/themeSlice";
// import { toastReducer } from "@/features/toast/state/toastSlice";
// import { transportReducer } from "@/features/transport/state/transportSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { Platform } from "react-native";
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
//   persistReducer,
//   persistStore,
// } from "redux-persist";
// const rootReducer = combineReducers({
//   auth: authReducer,
//   onboarding: onboardingReducer,
//   theme: themeReducer,
//   toast: toastReducer,
//   transport: transportReducer,
//   route: routeReducer,
//   map: mapReducer,
//   location: locationReducer,
// });
// const storage =
//   Platform.OS === "web"
//     ? require("redux-persist/lib/storage").default
//     : AsyncStorage;
// const persistConfig = {
//   key: "derash-root",
//   version: 1,
//   storage,
//   whitelist: [
//     "auth",
//     "onboarding",
//     "theme",
//     "transport",
//     "route",
//     // Persist location only when this is a deliberate
//     // product requirement.
//     //
//     "location",
//   ],
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
//   devTools: __DEV__,
// });
// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppStore = typeof store;

import { authReducer } from "@/features/auth/state/authSlice";
import { locationReducer } from "@/features/location/state/locationSlice";
import { mapReducer } from "@/features/map/state/mapSlice";
import { onboardingReducer } from "@/features/onboarding/state/onboardingSlice";
import { routeReducer } from "@/features/routes/state/routeSlice";
import { themeReducer } from "@/features/theme/state/themeSlice";
import { toastReducer } from "@/features/toast/state/toastSlice";
import { transportReducer } from "@/features/transport/state/transportSlice";
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
  createMigrate,
  persistReducer,
  persistStore,
  type MigrationManifest,
  type PersistConfig,
} from "redux-persist";
const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
  theme: themeReducer,
  toast: toastReducer,
  transport: transportReducer,
  route: routeReducer,
  map: mapReducer,
  location: locationReducer,
});
type RootReducerState = ReturnType<typeof rootReducer>;
const storage =
  Platform.OS === "web"
    ? require("redux-persist/lib/storage").default
    : AsyncStorage;
/** * Add migration functions when persisted state structures change. *
 * * Example: *
 *  * 2: (state) => ({ * ...state, * onboarding: { * ...state.onboarding, * completedVersion: 1, * }, * }), */
const migrations: MigrationManifest = { 1: (state) => state };
const persistConfig: PersistConfig<RootReducerState> = {
  key: "derash-root",
  version: 1,
  storage,
  migrate: createMigrate(migrations, { debug: __DEV__ }),
  whitelist: [
    "onboarding",
    "theme",
    "transport",
    "route",
    /** Avoid persisting live location by default. *
     * Persist location only when the product specifically needs
     *  the last known coordinates after an application restart.
     */
    // "location",
    // "auth",
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
  devTools: __DEV__,
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
