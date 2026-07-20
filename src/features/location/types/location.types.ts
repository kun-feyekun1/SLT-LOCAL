// src/features/location/types/location.types.ts

export type LocationPermissionStatus =
  | "undetermined"
  | "granted"
  | "denied";

export type LocationRequestStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export type LocationTrackingStatus =
  | "idle"
  | "starting"
  | "tracking"
  | "stopping"
  | "failed";

export interface Coordinates {
  latitude: number;
  longitude: number;

  /**
   * Horizontal accuracy in meters.
   * May be null when the platform cannot determine it.
   */
  accuracy: number | null;

  altitude: number | null;
  altitudeAccuracy: number | null;

  /**
   * Direction of travel in degrees.
   * Usually between 0 and 360.
   */
  heading: number | null;

  /**
   * Device speed in meters per second.
   */
  speed: number | null;
}

export interface DeviceLocation {
  coords: Coordinates;

  /**
   * Unix timestamp in milliseconds.
   */
  timestamp: number;
}

export interface LocationError {
  message: string;
  code?: string;
}

export interface LocationState {
  currentLocation: DeviceLocation | null;
  lastKnownLocation: DeviceLocation | null;

  permissionStatus: LocationPermissionStatus;
  canAskPermissionAgain: boolean;

  requestStatus: LocationRequestStatus;
  trackingStatus: LocationTrackingStatus;

  error: LocationError | null;

  lastUpdatedAt: number | null;
}

export interface LocationTrackingOptions {
  /**
   * Minimum movement in meters before another update is delivered.
   */
  distanceInterval?: number;

  /**
   * Minimum time in milliseconds between updates.
   *
   * Primarily relevant on Android.
   */
  timeInterval?: number;

  accuracy?:
    | "lowest"
    | "low"
    | "balanced"
    | "high"
    | "highest"
    | "bestForNavigation";
}