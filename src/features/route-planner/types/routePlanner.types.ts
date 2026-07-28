export interface RoutePlanRequest {
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
}

/**
 * The backend currently declares an empty 200 response schema for POST /api/route/.
 * Keep this `unknown` until the backend publishes the actual route-plan response.
 */
export type RoutePlanResult = unknown;
