import { apiRequest } from "@/lib/api/httpClient";
import type { Operator } from "@/features/operators/types/operator.types";
import type {
  AssignRouteRequest,
  RouteCreateRequest,
  RouteListItem,
  RouteStopCreateRequest,
} from "@/features/routes/types/route.types";

export function getOperatorMe(): Promise<Operator> {
  return apiRequest<Operator>("/api/operator/me", {
    auth: true,
  });
}

export function getOperatorRoutes(): Promise<RouteListItem[]> {
  return apiRequest<RouteListItem[]>(
    "/api/operator/routes",
    { auth: true },
  );
}

export function createOperatorRoute(
  payload: RouteCreateRequest,
): Promise<unknown> {
  return apiRequest<unknown, RouteCreateRequest>(
    "/api/operator/routes",
    {
      method: "POST",
      auth: true,
      body: payload,
    },
  );
}

export function addRouteStop(
  routeId: number,
  payload: RouteStopCreateRequest,
): Promise<unknown> {
  // Current OpenAPI path uses {routes_id}, while `route_id`
  // is separately declared as a required query parameter.
  // Send the same ID in both positions until backend fixes the contract.
  return apiRequest<unknown, RouteStopCreateRequest>(
    `/api/operator/routes/${routeId}/stops`,
    {
      method: "POST",
      auth: true,
      query: { route_id: routeId },
      body: payload,
    },
  );
}

export function assignDriverToRoute(
  driverId: number,
  payload: AssignRouteRequest,
): Promise<unknown> {
  return apiRequest<unknown, AssignRouteRequest>(
    `/api/operator/drivers/${driverId}/assign`,
    {
      method: "POST",
      auth: true,
      body: payload,
    },
  );
}
