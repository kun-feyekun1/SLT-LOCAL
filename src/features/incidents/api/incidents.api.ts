import { httpClient } from "@/services/api";
import type {
  Incident,
  IncidentCreate,
} from "@/features/incidents/types/incident.types";

export async function reportIncident(
  payload: IncidentCreate,
): Promise<unknown> {
  const response = await httpClient.post<unknown>(
    "/api/drivers/incident",
    payload,
  );

  return response.data;
}

export async function getOperatorIncidents(): Promise<Incident[]> {
  const response = await httpClient.get<Incident[]>(
    "/api/operator/incidents",
  );

  return response.data;
}
