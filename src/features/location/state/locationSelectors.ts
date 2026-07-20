// src/features/location/state/locationSelectors.ts

import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store";

export const selectLocationState = (state: RootState) =>
  state.location;

export const selectCurrentLocation = (state: RootState) =>
  state.location.currentLocation;

export const selectCurrentCoordinates = createSelector(
  selectCurrentLocation,
  (location) => location?.coords ?? null,
);

export const selectLatitude = createSelector(
  selectCurrentCoordinates,
  (coords) => coords?.latitude ?? null,
);

export const selectLongitude = createSelector(
  selectCurrentCoordinates,
  (coords) => coords?.longitude ?? null,
);

export const selectLastKnownLocation = (state: RootState) =>
  state.location.lastKnownLocation;

export const selectLocationPermissionStatus = (
  state: RootState,
) => state.location.permissionStatus;

export const selectCanAskLocationPermissionAgain = (
  state: RootState,
) => state.location.canAskPermissionAgain;

export const selectLocationRequestStatus = (
  state: RootState,
) => state.location.requestStatus;

export const selectLocationTrackingStatus = (
  state: RootState,
) => state.location.trackingStatus;

export const selectLocationError = (state: RootState) =>
  state.location.error;

export const selectLocationLastUpdatedAt = (
  state: RootState,
) => state.location.lastUpdatedAt;

export const selectHasLocationPermission = createSelector(
  selectLocationPermissionStatus,
  (status) => status === "granted",
);

export const selectIsLocationLoading = createSelector(
  selectLocationRequestStatus,
  (status) => status === "loading",
);

export const selectIsLocationTracking = createSelector(
  selectLocationTrackingStatus,
  (status) => status === "tracking",
);

export const selectIsLocationTrackingStarting =
  createSelector(
    selectLocationTrackingStatus,
    (status) => status === "starting",
  );

export const selectHasCurrentLocation = createSelector(
  selectCurrentLocation,
  (location) => location !== null,
);