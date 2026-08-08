import type { NamedLocation } from '@/types/location';
import type { TransportMode } from '@/features/transport/types/transport.types';

export type RouteLeg = {
  id: string;
  mode: TransportMode;
  title: string;
  from: NamedLocation;
  to: NamedLocation;
  durationMinutes: number;
  distanceMeters: number;
  polyline: string;
};

export type RouteRecommendation = {
  id: string;
  title: string;
  totalMinutes: number;
  totalFare: number;
  reliabilityScore: number;
  legs: RouteLeg[];
};

/**
 * Backend route contracts.
 *
 * These mirror the API payloads exactly, including snake_case
 * naming, so they intentionally differ from the client-side
 * planning types above (`RouteLeg`, `RouteRecommendation`).
 */

export interface RouteStop {
  id: number;
  route_id: number;
  terminal_id: number;
  stop_order: number;
  name?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface RouteListItem {
  id: number;
  name: string;
  name_am?: string | null;
  origin_terminal_id?: number | null;
  destination_terminal_id?: number | null;
  distance_km?: number | null;
  estimated_duration_minutes?: number | null;
  fare?: number | null;
  is_active: boolean;
}

export interface RouteDetail extends RouteListItem {
  stops: RouteStop[];
  operator_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface RouteCreateRequest {
  name: string;
  name_am?: string | null;
  origin_terminal_id?: number | null;
  destination_terminal_id?: number | null;
  distance_km?: number | null;
  estimated_duration_minutes?: number | null;
  fare?: number | null;
}

export interface RouteStopCreateRequest {
  terminal_id: number;
  stop_order: number;
}

export interface AssignRouteRequest {
  route_id: number;
}
