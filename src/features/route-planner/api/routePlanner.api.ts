import { httpClient } from "@/services/api";
import type {
  RoutePlanRequest,
  RoutePlanResult,
} from "@/features/route-planner/types/routePlanner.types";

export async function planRoute(
  payload: RoutePlanRequest,
): Promise<RoutePlanResult> {
  const response = await httpClient.post<RoutePlanResult>(
    "/api/route/",
    payload,
  );

  return response.data;
}
