export type RealtimeStatus =
  | "idle"
  | "connecting"
  | "authenticating"
  | "connected"
  | "reconnecting"
  | "disconnected";

export type RealtimeListener<T> = (payload: T) => void;

export type RealtimeStatusListener = (status: RealtimeStatus) => void;

export interface RealtimeEvent<TPayload = unknown> {
  event: string;
  payload: TPayload;
  id?: string;
  timestamp?: string;
}

export interface RealtimeOutgoingMessage<TPayload = unknown> {
  event: string;
  payload?: TPayload;
  requestId?: string;
}

export interface RealtimeAuthMessage {
  event: "auth";
  payload: {
    token: string;
  };
}

export interface RealtimeClientOptions {
  url: string;

  /**
   * Resolve the current access token immediately before connecting.
   */
  getAccessToken: () => Promise<string | null>;

  enabled?: boolean;
  connectTimeoutMs?: number;

  /**
   * Maximum reconnection delay after exponential backoff.
   */
  maxReconnectDelayMs?: number;

  /**
   * Initial reconnection delay.
   */
  initialReconnectDelayMs?: number;

  /**
   * Maximum reconnect attempts.
   * Use Infinity for continuous retry.
   */
  maxReconnectAttempts?: number;

  /**
   * Application heartbeat message interval.
   *
   * Browsers and React Native do not expose low-level WebSocket
   * ping frames, so this uses application messages.
   */
  heartbeatIntervalMs?: number;

  /**
   * Time allowed since the last server activity before reconnecting.
   */
  connectionStaleAfterMs?: number;

  authMode?: "message" | "query";

  authQueryParameter?: string;
}
