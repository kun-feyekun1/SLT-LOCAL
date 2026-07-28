import { apiRequest } from "@/lib/api/httpClient";
import type {
  Incident,
  IncidentCreate,
} from "@/features/incidents/types/incident.types";

export function reportIncident(
  payload: IncidentCreate,
): Promise<unknown> {
  return apiRequest<unknown, IncidentCreate>(
    "/api/drivers/incident",
    {
      method: "POST",
      auth: true,
      body: payload,
    },
  );
}

export function getOperatorIncidents(): Promise<Incident[]> {
  return apiRequest<Incident[]>(
    "/api/operator/incidents",
    { auth: true },
  );
}
