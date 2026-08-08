import { httpClient } from "@/services/api";
import type { Trip } from "@/features/trips/types/trip.types";

export async function startTrip(): Promise<Trip> {
  const response = await httpClient.post<Trip>("/api/drivers/trip/start");

  return response.data;
}

export async function endTrip(): Promise<Trip> {
  const response = await httpClient.post<Trip>("/api/drivers/trip/end");

  return response.data;
}

export async function getMyTrips(): Promise<Trip[]> {
  const response = await httpClient.get<Trip[]>("/api/drivers/me/trips");

  return response.data;
}
