import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createSavedPlace,
  deleteSavedPlace,
  getSavedPlaces,
} from "@/features/saved-places/api/savedPlaces.api";
import type { CreateSavedPlaceRequest } from "@/features/saved-places/types/savedPlace.types";

export const savedPlaceKeys = {
  all: ["saved-places"] as const,
  byUser: (userId: number) =>
    [...savedPlaceKeys.all, userId] as const,
};

export function useSavedPlaces(
  userId?: number | null,
) {
  return useQuery({
    queryKey: savedPlaceKeys.byUser(userId ?? -1),
    queryFn: () => getSavedPlaces(userId as number),
    enabled: typeof userId === "number",
  });
}

export function useCreateSavedPlace(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSavedPlaceRequest) =>
      createSavedPlace(userId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: savedPlaceKeys.byUser(userId),
      });
    },
  });
}

export function useDeleteSavedPlace(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeId: number) =>
      deleteSavedPlace(userId, placeId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: savedPlaceKeys.byUser(userId),
      });
    },
  });
}
