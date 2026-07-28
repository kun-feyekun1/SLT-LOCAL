import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  endTrip,
  getMyTrips,
  startTrip,
} from "@/features/trips/api/trips.api";

export const tripKeys = {
  all: ["trips"] as const,
  mine: () => [...tripKeys.all, "mine"] as const,
};

export function useMyTrips() {
  return useQuery({
    queryKey: tripKeys.mine(),
    queryFn: getMyTrips,
  });
}

export function useStartTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTrip,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tripKeys.mine(),
      });
    },
  });
}

export function useEndTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: endTrip,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tripKeys.mine(),
      });
    },
  });
}
