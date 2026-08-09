import { httpClient } from "@/services/api";
import type {
  NearbyTerminalParams,
  Terminal,
  TerminalCreate,
  TerminalListParams,
} from "@/features/terminals/types/terminal.types";

export async function getTerminals(
  params: TerminalListParams = {},
): Promise<Terminal[]> {
  const response = await httpClient.get<Terminal[]>("/api/terminals/", {
    params: {
      skip: params.skip ?? 0,
      limit: params.limit ?? 500,
      category: params.category,
    },
  });

  return response.data;
}

export async function searchTerminals(
  q: string,
  limit = 20,
): Promise<Terminal[]> {
  const response = await httpClient.get<Terminal[]>("/api/terminals/search", {
    params: { q, limit },
  });

  return response.data;
}

export async function getNearbyTerminals({
  latitude,
  longitude,
  radius = 1000,
  limit = 20,
}: NearbyTerminalParams): Promise<Terminal[]> {
  // Current OpenAPI oddly exposes both `radius` and `int`.
  // Sending both isolates that backend contract issue here.
  const response = await httpClient.get<Terminal[]>("/api/terminals/nearby", {
    params: {
      latitude,
      longitude,
      radius,
      int: radius,
      limit,
    },
  });

  return response.data;
}

export async function getUnverifiedTerminals(
  skip = 0,
  limit = 50,
): Promise<Terminal[]> {
  const response = await httpClient.get<Terminal[]>(
    "/api/terminals/unverified",
    { params: { skip, limit } },
  );

  return response.data;
}

export async function getTerminal(
  terminalId: number,
): Promise<Terminal> {
  const response = await httpClient.get<Terminal>(
    `/api/terminals/${terminalId}`,
  );

  return response.data;
}

export async function createTerminal(
  payload: TerminalCreate,
): Promise<Terminal> {
  const response = await httpClient.post<Terminal>(
    "/api/terminals/",
    payload,
  );

  return response.data;
}

export async function verifyTerminal(
  terminalId: number,
): Promise<unknown> {
  const response = await httpClient.put<unknown>(
    `/api/terminals/${terminalId}/verify`,
  );

  return response.data;
}

export async function deactivateTerminal(
  terminalId: number,
): Promise<unknown> {
  const response = await httpClient.put<unknown>(
    `/api/terminals/${terminalId}/deactivate`,
  );

  return response.data;
}
