import { useQuery } from "@tanstack/react-query";

import {
  getNearbyTerminals,
  getTerminal,
  getTerminals,
  searchTerminals,
} from "@/features/terminals/api/terminals.api";
import type {
  NearbyTerminalParams,
  TerminalListParams,
} from "@/features/terminals/types/terminal.types";

export const terminalKeys = {
  all: ["terminals"] as const,
  lists: () => [...terminalKeys.all, "list"] as const,
  list: (params: TerminalListParams) =>
    [...terminalKeys.lists(), params] as const,
  detail: (id: number) =>
    [...terminalKeys.all, "detail", id] as const,
  search: (q: string, limit: number) =>
    [...terminalKeys.all, "search", q, limit] as const,
  nearby: (params: NearbyTerminalParams) =>
    [...terminalKeys.all, "nearby", params] as const,
};

export function useTerminals(
  params: TerminalListParams = {},
) {
  return useQuery({
    queryKey: terminalKeys.list(params),
    queryFn: () => getTerminals(params),
  });
}

export function useTerminal(id: number) {
  return useQuery({
    queryKey: terminalKeys.detail(id),
    queryFn: () => getTerminal(id),
    enabled: Number.isFinite(id),
  });
}

export function useTerminalSearch(
  q: string,
  limit = 20,
) {
  const normalized = q.trim();

  return useQuery({
    queryKey: terminalKeys.search(normalized, limit),
    queryFn: () =>
      searchTerminals(normalized, limit),
    enabled: normalized.length >= 2,
  });
}

export function useNearbyTerminals(
  params?: NearbyTerminalParams,
) {
  return useQuery({
    queryKey: terminalKeys.nearby(
      params ?? {
        latitude: 0,
        longitude: 0,
        radius: 1000,
        limit: 20,
      },
    ),
    queryFn: () => getNearbyTerminals(params!),
    enabled: !!params,
  });
}
