import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addRouteStop,
  createOperatorRoute,
  getOperatorMe,
  getOperatorRoutes,
} from "@/features/operators/api/operators.api";
import type {
  RouteCreateRequest,
  RouteStopCreateRequest,
} from "@/features/routes/types/route.types";

export const operatorKeys = {
  all: ["operator"] as const,
  me: () => [...operatorKeys.all, "me"] as const,
  routes: () => [...operatorKeys.all, "routes"] as const,
};

export function useOperatorMe() {
  return useQuery({
    queryKey: operatorKeys.me(),
    queryFn: getOperatorMe,
  });
}

export function useOperatorRoutes() {
  return useQuery({
    queryKey: operatorKeys.routes(),
    queryFn: getOperatorRoutes,
  });
}

export function useCreateOperatorRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RouteCreateRequest) =>
      createOperatorRoute(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: operatorKeys.routes(),
      });
    },
  });
}

export function useAddRouteStop(routeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RouteStopCreateRequest) =>
      addRouteStop(routeId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: operatorKeys.routes(),
      });
    },
  });
}
