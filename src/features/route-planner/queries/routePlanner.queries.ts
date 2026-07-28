import { useMutation } from "@tanstack/react-query";

import { planRoute } from "@/features/route-planner/api/routePlanner.api";

export function usePlanRoute() {
  return useMutation({
    mutationFn: planRoute,
  });
}
