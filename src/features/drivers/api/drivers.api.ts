import { httpClient } from "@/services/api";
import type {
  Driver,
  DriverAvailability,
  DriverUpdate,
  LocationUpdate,
  PasswordChange,
} from "@/features/drivers/types/driver.types";
import type { RouteDetail } from "@/features/routes/types/route.types";

export async function getDriverMe(): Promise<Driver> {
  const response = await httpClient.get<Driver>("/api/drivers/me");

  return response.data;
}

export async function updateDriverMe(
  payload: DriverUpdate,
): Promise<Driver> {
  const response = await httpClient.put<Driver>(
    "/api/drivers/me",
    payload,
  );

  return response.data;
}

export async function updateDriverLocation(
  payload: LocationUpdate,
): Promise<unknown> {
  const response = await httpClient.post<unknown>(
    "/api/drivers/location",
    payload,
  );

  return response.data;
}

export async function updateDriverAvailability(
  payload: DriverAvailability,
): Promise<unknown> {
  const response = await httpClient.put<unknown>(
    "/api/drivers/available",
    payload,
  );

  return response.data;
}

export async function getAssignedRoute(): Promise<RouteDetail> {
  // Current backend path intentionally has no slash between `drivers` and `me`.
  const response = await httpClient.get<RouteDetail>(
    "/api/driversme/route",
  );

  return response.data;
}

export async function changeDriverPassword(
  payload: PasswordChange,
): Promise<unknown> {
  // Keep the backend's current misspelling isolated here.
  const response = await httpClient.post<unknown>(
    "/api/drivers/change_pasword",
    payload,
  );

  return response.data;
}
