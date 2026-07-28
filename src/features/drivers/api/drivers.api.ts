import { apiRequest } from "@/lib/api/httpClient";
import type {
  Driver,
  DriverAvailability,
  DriverUpdate,
  LocationUpdate,
  PasswordChange,
} from "@/features/drivers/types/driver.types";
import type { RouteDetail } from "@/features/routes/types/route.types";

export function getDriverMe(): Promise<Driver> {
  return apiRequest<Driver>("/api/drivers/me", {
    auth: true,
  });
}

export function updateDriverMe(
  payload: DriverUpdate,
): Promise<Driver> {
  return apiRequest<Driver, DriverUpdate>(
    "/api/drivers/me",
    {
      method: "PUT",
      auth: true,
      body: payload,
    },
  );
}

export function updateDriverLocation(
  payload: LocationUpdate,
): Promise<unknown> {
  return apiRequest<unknown, LocationUpdate>(
    "/api/drivers/location",
    {
      method: "POST",
      auth: true,
      body: payload,
    },
  );
}

export function updateDriverAvailability(
  payload: DriverAvailability,
): Promise<unknown> {
  return apiRequest<unknown, DriverAvailability>(
    "/api/drivers/available",
    {
      method: "PUT",
      auth: true,
      body: payload,
    },
  );
}

export function getAssignedRoute(): Promise<RouteDetail> {
  // Current backend path intentionally has no slash between `drivers` and `me`.
  return apiRequest<RouteDetail>(
    "/api/driversme/route",
    { auth: true },
  );
}

export function changeDriverPassword(
  payload: PasswordChange,
): Promise<unknown> {
  // Keep the backend's current misspelling isolated here.
  return apiRequest<unknown, PasswordChange>(
    "/api/drivers/change_pasword",
    {
      method: "POST",
      auth: true,
      body: payload,
    },
  );
}
