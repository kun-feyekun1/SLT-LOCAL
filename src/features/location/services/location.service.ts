// src/features/location/services/location.service.ts

import * as ExpoLocation from "expo-location";

import type {
  DeviceLocation,
  LocationPermissionStatus,
  LocationTrackingOptions,
} from "@/features/location/types/location.types";

export interface LocationPermissionResult {
  status: LocationPermissionStatus;
  canAskAgain: boolean;
}

export interface StartLocationWatcherOptions {
  trackingOptions?: LocationTrackingOptions;
  onLocation: (location: DeviceLocation) => void;
  onError?: (error: Error) => void;
}

let foregroundSubscription: ExpoLocation.LocationSubscription | null = null;

function mapPermissionStatus(
  status: ExpoLocation.PermissionStatus,
): LocationPermissionStatus {
  switch (status) {
    case ExpoLocation.PermissionStatus.GRANTED:
      return "granted";

    case ExpoLocation.PermissionStatus.DENIED:
      return "denied";

    default:
      return "undetermined";
  }
}

function mapAccuracy(
  accuracy: LocationTrackingOptions["accuracy"],
): ExpoLocation.Accuracy {
  switch (accuracy) {
    case "lowest":
      return ExpoLocation.Accuracy.Lowest;

    case "low":
      return ExpoLocation.Accuracy.Low;

    case "high":
      return ExpoLocation.Accuracy.High;

    case "highest":
      return ExpoLocation.Accuracy.Highest;

    case "bestForNavigation":
      return ExpoLocation.Accuracy.BestForNavigation;

    case "balanced":
    default:
      return ExpoLocation.Accuracy.Balanced;
  }
}

function mapExpoLocation(
  location: ExpoLocation.LocationObject,
): DeviceLocation {
  return {
    coords: {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      altitude: location.coords.altitude,
      altitudeAccuracy: location.coords.altitudeAccuracy,
      heading: location.coords.heading,
      speed: location.coords.speed,
    },
    timestamp: location.timestamp,
  };
}

async function getPermissionStatus(): Promise<LocationPermissionResult> {
  const permission = await ExpoLocation.getForegroundPermissionsAsync();

  return {
    status: mapPermissionStatus(permission.status),
    canAskAgain: permission.canAskAgain,
  };
}

async function requestForegroundPermission(): Promise<LocationPermissionResult> {
  const permission =
    await ExpoLocation.requestForegroundPermissionsAsync();

  return {
    status: mapPermissionStatus(permission.status),
    canAskAgain: permission.canAskAgain,
  };
}

async function isLocationServiceEnabled(): Promise<boolean> {
  return ExpoLocation.hasServicesEnabledAsync();
}

async function getCurrentLocation(
  accuracy: LocationTrackingOptions["accuracy"] = "high",
): Promise<DeviceLocation> {
  const location = await ExpoLocation.getCurrentPositionAsync({
    accuracy: mapAccuracy(accuracy),
  });

  return mapExpoLocation(location);
}

async function getLastKnownLocation(): Promise<DeviceLocation | null> {
  const location = await ExpoLocation.getLastKnownPositionAsync();

  if (!location) {
    return null;
  }

  return mapExpoLocation(location);
}

async function startForegroundWatcher({
  trackingOptions,
  onLocation,
  onError,
}: StartLocationWatcherOptions): Promise<void> {
  // Avoid accidentally creating multiple native subscriptions.
  stopForegroundWatcher();

  try {
    foregroundSubscription = await ExpoLocation.watchPositionAsync(
      {
        accuracy: mapAccuracy(trackingOptions?.accuracy ?? "high"),

        distanceInterval:
          trackingOptions?.distanceInterval ?? 10,

        timeInterval:
          trackingOptions?.timeInterval ?? 5_000,
      },
      (location) => {
        onLocation(mapExpoLocation(location));
      },
    );
  } catch (error) {
    const normalizedError =
      error instanceof Error
        ? error
        : new Error("Unable to start location tracking.");

    onError?.(normalizedError);

    throw normalizedError;
  }
}

function stopForegroundWatcher(): void {
  foregroundSubscription?.remove();
  foregroundSubscription = null;
}

function isForegroundWatcherActive(): boolean {
  return foregroundSubscription !== null;
}

export const locationService = {
  getPermissionStatus,
  requestForegroundPermission,
  isLocationServiceEnabled,
  getCurrentLocation,
  getLastKnownLocation,
  startForegroundWatcher,
  stopForegroundWatcher,
  isForegroundWatcherActive,
};