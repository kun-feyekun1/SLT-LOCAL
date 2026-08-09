import { appConfig } from "@/config/environment";
import { tokenStorage } from "@/services/storage/tokenStorage";

import { RealtimeClient } from "./realtimeClient";

export const realtimeClient = new RealtimeClient({
  url: appConfig.realtimeUrl,

  enabled: appConfig.featureFlags.enableRealtimeTracking,

  getAccessToken: () => tokenStorage.getAccessToken(),

  /**
   * Prefer sending authentication as the first WebSocket
   * message instead of placing a long-lived token in the URL.
   */
  authMode: "message",

  connectTimeoutMs: 15_000,
  initialReconnectDelayMs: 1_000,
  maxReconnectDelayMs: 30_000,
  maxReconnectAttempts: Number.POSITIVE_INFINITY,

  heartbeatIntervalMs: 25_000,
  connectionStaleAfterMs: 60_000,
});

export { RealtimeClient } from "./realtimeClient";

export type {
  RealtimeAuthMessage,
  RealtimeClientOptions,
  RealtimeEvent,
  RealtimeListener,
  RealtimeOutgoingMessage,
  RealtimeStatus,
  RealtimeStatusListener,
} from "./realtime.types";
