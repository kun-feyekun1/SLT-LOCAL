import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAssignedRoute,
  getDriverMe,
  updateDriverAvailability,
  updateDriverLocation,
  updateDriverMe,
} from "@/features/drivers/api/drivers.api";

export const driverKeys = {
  all: ["driver"] as const,
  me: () => [...driverKeys.all, "me"] as const,
  assignedRoute: () =>
    [...driverKeys.all, "assigned-route"] as const,
};

export function useDriverMe() {
  return useQuery({
    queryKey: driverKeys.me(),
    queryFn: getDriverMe,
  });
}

export function useAssignedRoute() {
  return useQuery({
    queryKey: driverKeys.assignedRoute(),
    queryFn: getAssignedRoute,
  });
}

export function useUpdateDriverMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDriverMe,
    onSuccess: (driver) => {
      queryClient.setQueryData(
        driverKeys.me(),
        driver,
      );
    },
  });
}

export function useUpdateDriverLocation() {
  return useMutation({
    mutationFn: updateDriverLocation,
  });
}

export function useUpdateDriverAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDriverAvailability,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: driverKeys.me(),
      });
    },
  });
}
