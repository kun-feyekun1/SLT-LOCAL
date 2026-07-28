export type IncidentType =
  | "breakdown"
  | "accident"
  | "road_closure"
  | "fuel"
  | "other";

export interface IncidentCreate {
  incident_type: IncidentType;
  description?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface Incident {
  id: number;
  incident_type: string;
  description?: string | null;
  driver_id: number;
  route_id?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  status: string;
}
