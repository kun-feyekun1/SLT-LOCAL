import { apiRequest } from "@/lib/api/httpClient";
import type {
  CreateSavedPlaceRequest,
  SavedPlace,
} from "@/features/saved-places/types/savedPlace.types";

function normalizeSavedPlaces(raw: unknown): SavedPlace[] {
  if (!Array.isArray(raw)) {
    throw new Error(
      "Saved-place list response is not an array. " +
        "Update savedPlaces.api.ts to match the backend payload.",
    );
  }

  return raw as SavedPlace[];
}

export async function getSavedPlaces(
  userId: number,
): Promise<SavedPlace[]> {
  const raw = await apiRequest<unknown>(
    `/api/users/${userId}/saved-places`,
  );

  return normalizeSavedPlaces(raw);
}

export function createSavedPlace(
  userId: number,
  payload: CreateSavedPlaceRequest,
): Promise<unknown> {
  return apiRequest<unknown, CreateSavedPlaceRequest>(
    `/api/users/${userId}/saved-places`,
    {
      method: "POST",
      body: payload,
    },
  );
}

export function deleteSavedPlace(
  userId: number,
  placeId: number,
): Promise<unknown> {
  return apiRequest<unknown>(
    `/api/users/${userId}/saved-places/${placeId}`,
    { method: "DELETE" },
  );
}
