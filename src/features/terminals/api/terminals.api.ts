import { apiRequest } from "@/lib/api/httpClient";
import type {
  NearbyTerminalParams,
  Terminal,
  TerminalCreate,
  TerminalListParams,
} from "@/features/terminals/types/terminal.types";

export function getTerminals(
  params: TerminalListParams = {},
): Promise<Terminal[]> {
  return apiRequest<Terminal[]>("/api/terminals/", {
    query: {
      skip: params.skip ?? 0,
      limit: params.limit ?? 500,
      category: params.category,
    },
  });
}

export function searchTerminals(
  q: string,
  limit = 20,
): Promise<Terminal[]> {
  return apiRequest<Terminal[]>("/api/terminals/search", {
    query: { q, limit },
  });
}

export function getNearbyTerminals({
  latitude,
  longitude,
  radius = 1000,
  limit = 20,
}: NearbyTerminalParams): Promise<Terminal[]> {
  // Current OpenAPI oddly exposes both `radius` and `int`.
  // Sending both isolates that backend contract issue here.
  return apiRequest<Terminal[]>("/api/terminals/nearby", {
    query: {
      latitude,
      longitude,
      radius,
      int: radius,
      limit,
    },
  });
}

export function getUnverifiedTerminals(
  skip = 0,
  limit = 50,
): Promise<Terminal[]> {
  return apiRequest<Terminal[]>(
    "/api/terminals/unverified",
    { query: { skip, limit } },
  );
}

export function getTerminal(
  terminalId: number,
): Promise<Terminal> {
  return apiRequest<Terminal>(
    `/api/terminals/${terminalId}`,
  );
}

export function createTerminal(
  payload: TerminalCreate,
): Promise<Terminal> {
  return apiRequest<Terminal, TerminalCreate>(
    "/api/terminals/",
    {
      method: "POST",
      body: payload,
    },
  );
}

export function verifyTerminal(
  terminalId: number,
): Promise<unknown> {
  return apiRequest<unknown>(
    `/api/terminals/${terminalId}/verify`,
    { method: "PUT" },
  );
}

export function deactivateTerminal(
  terminalId: number,
): Promise<unknown> {
  return apiRequest<unknown>(
    `/api/terminals/${terminalId}/deactivate`,
    { method: "PUT" },
  );
}
