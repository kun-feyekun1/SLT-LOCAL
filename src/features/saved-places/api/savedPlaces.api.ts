import { httpClient } from "@/services/api";
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
  const response = await httpClient.get<unknown>(
    `/api/users/${userId}/saved-places`,
  );

  return normalizeSavedPlaces(response.data);
}

export async function createSavedPlace(
  userId: number,
  payload: CreateSavedPlaceRequest,
): Promise<unknown> {
  const response = await httpClient.post<unknown>(
    `/api/users/${userId}/saved-places`,
    payload,
  );

  return response.data;
}

export async function deleteSavedPlace(
  userId: number,
  placeId: number,
): Promise<unknown> {
  const response = await httpClient.delete<unknown>(
    `/api/users/${userId}/saved-places/${placeId}`,
  );

  return response.data;
}
