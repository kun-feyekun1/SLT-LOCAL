// src/features/location/hooks/useLocation.ts

import { useCallback } from "react";

import {
  clearCurrentLocation,
  clearLocationError,
} from "@/features/location/state/locationSlice";

import {
  selectCanAskLocationPermissionAgain,
  selectCurrentCoordinates,
  selectCurrentLocation,
  selectHasLocationPermission,
  selectIsLocationLoading,
  selectIsLocationTracking,
  selectIsLocationTrackingStarting,
  selectLastKnownLocation,
  selectLocationError,
  selectLocationLastUpdatedAt,
  selectLocationPermissionStatus,
  selectLocationRequestStatus,
  selectLocationTrackingStatus,
} from "@/features/location/state/locationSelectors";

import {
  checkLocationPermission,
  fetchCurrentLocation,
  loadLastKnownLocation,
  requestLocationPermission,
  startLocationTracking,
  stopLocationTracking,
} from "@/features/location/state/locationThunks";

import type { LocationTrackingOptions } from "@/features/location/types/location.types";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useLocation() {
  const dispatch = useAppDispatch();

  const currentLocation = useAppSelector(selectCurrentLocation);

  const coordinates = useAppSelector(selectCurrentCoordinates);

  const lastKnownLocation = useAppSelector(selectLastKnownLocation);

  const permissionStatus = useAppSelector(selectLocationPermissionStatus);

  const canAskPermissionAgain = useAppSelector(
    selectCanAskLocationPermissionAgain
  );

  const requestStatus = useAppSelector(selectLocationRequestStatus);

  const trackingStatus = useAppSelector(selectLocationTrackingStatus);

  const error = useAppSelector(selectLocationError);

  const lastUpdatedAt = useAppSelector(selectLocationLastUpdatedAt);

  const hasPermission = useAppSelector(selectHasLocationPermission);

  const isLoading = useAppSelector(selectIsLocationLoading);

  const isTracking = useAppSelector(selectIsLocationTracking);

  const isStartingTracking = useAppSelector(selectIsLocationTrackingStarting);

  const checkPermission = useCallback(async () => {
    return dispatch(checkLocationPermission()).unwrap();
  }, [dispatch]);

  const requestPermission = useCallback(async () => {
    return dispatch(requestLocationPermission()).unwrap();
  }, [dispatch]);

  const getLastKnownLocation = useCallback(async () => {
    return dispatch(loadLastKnownLocation()).unwrap();
  }, [dispatch]);

  const getCurrentLocation = useCallback(
    async (accuracy: LocationTrackingOptions["accuracy"] = "high") => {
      return dispatch(fetchCurrentLocation(accuracy)).unwrap();
    },
    [dispatch]
  );

  const startTracking = useCallback(
    async (options?: LocationTrackingOptions) => {
      return dispatch(startLocationTracking(options)).unwrap();
    },
    [dispatch]
  );

  const stopTracking = useCallback(async () => {
    return dispatch(stopLocationTracking()).unwrap();
  }, [dispatch]);

  const dismissError = useCallback(() => {
    dispatch(clearLocationError());
  }, [dispatch]);

  const clearLocation = useCallback(() => {
    dispatch(clearCurrentLocation());
  }, [dispatch]);

  return {
    // State
    currentLocation,
    coordinates,
    lastKnownLocation,

    latitude: coordinates?.latitude ?? null,
    longitude: coordinates?.longitude ?? null,
    accuracy: coordinates?.accuracy ?? null,
    speed: coordinates?.speed ?? null,
    heading: coordinates?.heading ?? null,

    permissionStatus,
    canAskPermissionAgain,
    hasPermission,

    requestStatus,
    trackingStatus,

    isLoading,
    isTracking,
    isStartingTracking,

    error,
    lastUpdatedAt,

    // Actions
    checkPermission,
    requestPermission,
    getLastKnownLocation,
    getCurrentLocation,
    startTracking,
    stopTracking,
    dismissError,
    clearLocation,
  };
}
