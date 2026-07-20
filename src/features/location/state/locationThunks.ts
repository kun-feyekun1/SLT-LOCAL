// src/features/location/state/locationThunks.ts

import {
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { locationService } from "@/features/location/services/location.service";

import type {
  DeviceLocation,
  LocationError,
  LocationPermissionStatus,
  LocationTrackingOptions,
} from "@/features/location/types/location.types";

interface PermissionPayload {
  status: LocationPermissionStatus;
  canAskAgain: boolean;
}

interface StartTrackingPayload {
  started: true;
}

interface StopTrackingPayload {
  stopped: true;
}

function normalizeError(error: unknown): LocationError {
  if (error instanceof Error) {
    return {
      message: error.message,
      code:
        "code" in error && typeof error.code === "string"
          ? error.code
          : undefined,
    };
  }

  return {
    message: "An unknown location error occurred.",
  };
}

/**
 * Emitted repeatedly by the native foreground location watcher.
 */
export const locationUpdated = createAction<DeviceLocation>(
  "location/locationUpdated",
);

/**
 * Emitted when the active native watcher reports an error.
 */
export const locationTrackingFailed = createAction<LocationError>(
  "location/locationTrackingFailed",
);

export const checkLocationPermission = createAsyncThunk<
  PermissionPayload,
  void,
  { rejectValue: LocationError }
>(
  "location/checkPermission",
  async (_, { rejectWithValue }) => {
    try {
      return await locationService.getPermissionStatus();
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const requestLocationPermission = createAsyncThunk<
  PermissionPayload,
  void,
  { rejectValue: LocationError }
>(
  "location/requestPermission",
  async (_, { rejectWithValue }) => {
    try {
      return await locationService.requestForegroundPermission();
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const loadLastKnownLocation = createAsyncThunk<
  DeviceLocation | null,
  void,
  { rejectValue: LocationError }
>(
  "location/loadLastKnownLocation",
  async (_, { rejectWithValue }) => {
    try {
      return await locationService.getLastKnownLocation();
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const fetchCurrentLocation = createAsyncThunk<
  DeviceLocation,
  LocationTrackingOptions["accuracy"] | undefined,
  { rejectValue: LocationError }
>(
  "location/fetchCurrentLocation",
  async (accuracy, { rejectWithValue }) => {
    try {
      const permission =
        await locationService.getPermissionStatus();

      if (permission.status !== "granted") {
        return rejectWithValue({
          code: "LOCATION_PERMISSION_REQUIRED",
          message:
            "Location permission must be granted before requesting the current location.",
        });
      }

      const servicesEnabled =
        await locationService.isLocationServiceEnabled();

      if (!servicesEnabled) {
        return rejectWithValue({
          code: "LOCATION_SERVICES_DISABLED",
          message:
            "Location services are disabled on this device.",
        });
      }

      return await locationService.getCurrentLocation(
        accuracy ?? "high",
      );
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const startLocationTracking = createAsyncThunk<
  StartTrackingPayload,
  LocationTrackingOptions | undefined,
  { rejectValue: LocationError }
>(
  "location/startTracking",
  async (options, { dispatch, rejectWithValue }) => {
    try {
      const permission =
        await locationService.getPermissionStatus();

      if (permission.status !== "granted") {
        return rejectWithValue({
          code: "LOCATION_PERMISSION_REQUIRED",
          message:
            "Location permission must be granted before tracking can start.",
        });
      }

      const servicesEnabled =
        await locationService.isLocationServiceEnabled();

      if (!servicesEnabled) {
        return rejectWithValue({
          code: "LOCATION_SERVICES_DISABLED",
          message:
            "Location services are disabled on this device.",
        });
      }

      await locationService.startForegroundWatcher({
        trackingOptions: options,

        onLocation(location) {
          dispatch(locationUpdated(location));
        },

        onError(error) {
          dispatch(
            locationTrackingFailed(normalizeError(error)),
          );
        },
      });

      return {
        started: true,
      };
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const stopLocationTracking = createAsyncThunk<
  StopTrackingPayload,
  void,
  { rejectValue: LocationError }
>(
  "location/stopTracking",
  async (_, { rejectWithValue }) => {
    try {
      locationService.stopForegroundWatcher();

      return {
        stopped: true,
      };
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);