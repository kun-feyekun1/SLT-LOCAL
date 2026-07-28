import { apiRequest } from "@/lib/api/httpClient";
import type {
  RoutePlanRequest,
  RoutePlanResult,
} from "@/features/route-planner/types/routePlanner.types";

export function planRoute(
  payload: RoutePlanRequest,
): Promise<RoutePlanResult> {
  return apiRequest<RoutePlanResult, RoutePlanRequest>(
    "/api/route/",
    {
      method: "POST",
      body: payload,
    },
  );
}
