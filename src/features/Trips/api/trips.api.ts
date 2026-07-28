import { apiRequest } from "@/lib/api/httpClient";
import type { Trip } from "@/features/trips/types/trip.types";

export function startTrip(): Promise<Trip> {
  return apiRequest<Trip>("/api/drivers/trip/start", {
    method: "POST",
    auth: true,
  });
}

export function endTrip(): Promise<Trip> {
  return apiRequest<Trip>("/api/drivers/trip/end", {
    method: "POST",
    auth: true,
  });
}

export function getMyTrips(): Promise<Trip[]> {
  return apiRequest<Trip[]>("/api/drivers/me/trips", {
    auth: true,
  });
}
