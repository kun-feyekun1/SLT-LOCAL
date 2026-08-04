export interface MapCoordinate {
  latitude: number;
  longitude: number;
}

export interface TransportMapVehicle {
  id: string;
  mode: string;
  routeId?: string | null;
  heading?: number | null;
  updatedAt?: string | null;
  latitude: number;
  longitude: number;
}

export interface TransportMapProps {
  /**
   * Current map center, usually the passenger's current location.
   */
  center?: MapCoordinate | null;

  /**
   * Live vehicles displayed on the map.
   */
  vehicles?: TransportMapVehicle[];

  /**
   * Initial zoom level.
   *
   * @default 13.5
   */
  zoomLevel?: number;

  /**
   * Called when a vehicle marker is pressed.
   */
  onVehiclePress?: (vehicle: TransportMapVehicle) => void;
}