import { httpClient } from "@/services/api";
import type { Operator } from "@/features/operators/types/operator.types";
import type {
  AssignRouteRequest,
  RouteCreateRequest,
  RouteListItem,
  RouteStopCreateRequest,
} from "@/features/routes/types/route.types";

export async function getOperatorMe(): Promise<Operator> {
  const response = await httpClient.get<Operator>("/api/operator/me");

  return response.data;
}

export async function getOperatorRoutes(): Promise<RouteListItem[]> {
  const response = await httpClient.get<RouteListItem[]>(
    "/api/operator/routes",
  );

  return response.data;
}

export async function createOperatorRoute(
  payload: RouteCreateRequest,
): Promise<unknown> {
  const response = await httpClient.post<unknown>(
    "/api/operator/routes",
    payload,
  );

  return response.data;
}

export async function addRouteStop(
  routeId: number,
  payload: RouteStopCreateRequest,
): Promise<unknown> {
  // Current OpenAPI path uses {routes_id}, while `route_id`
  // is separately declared as a required query parameter.
  // Send the same ID in both positions until backend fixes the contract.
  const response = await httpClient.post<unknown>(
    `/api/operator/routes/${routeId}/stops`,
    payload,
    {
      params: { route_id: routeId },
    },
  );

  return response.data;
}

export async function assignDriverToRoute(
  driverId: number,
  payload: AssignRouteRequest,
): Promise<unknown> {
  const response = await httpClient.post<unknown>(
    `/api/operator/drivers/${driverId}/assign`,
    payload,
  );

  return response.data;
}
