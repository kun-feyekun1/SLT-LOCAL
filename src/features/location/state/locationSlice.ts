// src/features/location/state/locationSlice.ts

import { createSlice } from "@reduxjs/toolkit";

import {
  checkLocationPermission,
  fetchCurrentLocation,
  loadLastKnownLocation,
  locationTrackingFailed,
  locationUpdated,
  requestLocationPermission,
  startLocationTracking,
  stopLocationTracking,
} from "@/features/location/state/locationThunks";

import type { LocationState } from "@/features/location/types/location.types";

const initialState: LocationState = {
  currentLocation: null,
  lastKnownLocation: null,

  permissionStatus: "undetermined",
  canAskPermissionAgain: true,

  requestStatus: "idle",
  trackingStatus: "idle",

  error: null,

  lastUpdatedAt: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,

  reducers: {
    clearLocationError(state) {
      state.error = null;
    },

    clearCurrentLocation(state) {
      state.currentLocation = null;
      state.lastUpdatedAt = null;
    },

    resetLocationState() {
      return initialState;
    },
  },

  extraReducers(builder) {
    builder
      // Check permission
      .addCase(checkLocationPermission.pending, (state) => {
        state.error = null;
      })
      .addCase(
        checkLocationPermission.fulfilled,
        (state, action) => {
          state.permissionStatus = action.payload.status;
          state.canAskPermissionAgain =
            action.payload.canAskAgain;
        },
      )
      .addCase(
        checkLocationPermission.rejected,
        (state, action) => {
          state.error =
            action.payload ?? {
              message:
                "Unable to check location permission.",
            };
        },
      )

      // Request permission
      .addCase(requestLocationPermission.pending, (state) => {
        state.requestStatus = "loading";
        state.error = null;
      })
      .addCase(
        requestLocationPermission.fulfilled,
        (state, action) => {
          state.permissionStatus = action.payload.status;
          state.canAskPermissionAgain =
            action.payload.canAskAgain;

          state.requestStatus =
            action.payload.status === "granted"
              ? "succeeded"
              : "failed";

          if (action.payload.status !== "granted") {
            state.error = {
              code: "LOCATION_PERMISSION_DENIED",
              message: "Location permission was denied.",
            };
          }
        },
      )
      .addCase(
        requestLocationPermission.rejected,
        (state, action) => {
          state.requestStatus = "failed";
          state.error =
            action.payload ?? {
              message:
                "Unable to request location permission.",
            };
        },
      )

      // Last known location
      .addCase(loadLastKnownLocation.pending, (state) => {
        state.error = null;
      })
      .addCase(
        loadLastKnownLocation.fulfilled,
        (state, action) => {
          state.lastKnownLocation = action.payload;

          if (
            action.payload &&
            state.currentLocation === null
          ) {
            state.currentLocation = action.payload;
            state.lastUpdatedAt =
              action.payload.timestamp;
          }
        },
      )
      .addCase(
        loadLastKnownLocation.rejected,
        (state, action) => {
          state.error =
            action.payload ?? {
              message:
                "Unable to load the last known location.",
            };
        },
      )

      // One-time current location
      .addCase(fetchCurrentLocation.pending, (state) => {
        state.requestStatus = "loading";
        state.error = null;
      })
      .addCase(
        fetchCurrentLocation.fulfilled,
        (state, action) => {
          state.requestStatus = "succeeded";
          state.currentLocation = action.payload;
          state.lastKnownLocation = action.payload;
          state.lastUpdatedAt = action.payload.timestamp;
        },
      )
      .addCase(
        fetchCurrentLocation.rejected,
        (state, action) => {
          state.requestStatus = "failed";
          state.error =
            action.payload ?? {
              message:
                "Unable to retrieve the current location.",
            };
        },
      )

      // Start tracking
      .addCase(startLocationTracking.pending, (state) => {
        state.trackingStatus = "starting";
        state.error = null;
      })
      .addCase(
        startLocationTracking.fulfilled,
        (state) => {
          state.trackingStatus = "tracking";
        },
      )
      .addCase(
        startLocationTracking.rejected,
        (state, action) => {
          state.trackingStatus = "failed";
          state.error =
            action.payload ?? {
              message:
                "Unable to start location tracking.",
            };
        },
      )

      // Stop tracking
      .addCase(stopLocationTracking.pending, (state) => {
        state.trackingStatus = "stopping";
        state.error = null;
      })
      .addCase(
        stopLocationTracking.fulfilled,
        (state) => {
          state.trackingStatus = "idle";
        },
      )
      .addCase(
        stopLocationTracking.rejected,
        (state, action) => {
          state.trackingStatus = "failed";
          state.error =
            action.payload ?? {
              message:
                "Unable to stop location tracking.",
            };
        },
      )

      // Continuous watcher events
      .addCase(locationUpdated, (state, action) => {
        state.currentLocation = action.payload;
        state.lastKnownLocation = action.payload;
        state.lastUpdatedAt = action.payload.timestamp;
        state.trackingStatus = "tracking";
        state.error = null;
      })
      .addCase(
        locationTrackingFailed,
        (state, action) => {
          state.trackingStatus = "failed";
          state.error = action.payload;
        },
      );
  },
});

export const {
  clearLocationError,
  clearCurrentLocation,
  resetLocationState,
} = locationSlice.actions;

export const locationReducer = locationSlice.reducer;

export default locationSlice.reducer;