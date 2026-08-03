import NetInfo, {
  type NetInfoSubscription,
} from "@react-native-community/netinfo";
import {
  AppState,
  type AppStateStatus,
  type NativeEventSubscription,
} from "react-native";

import { logger } from "@/services/logging";

import type {
  RealtimeAuthMessage,
  RealtimeClientOptions,
  RealtimeEvent,
  RealtimeListener,
  RealtimeOutgoingMessage,
  RealtimeStatus,
  RealtimeStatusListener,
} from "./realtime.types";

type UnknownListener = RealtimeListener<unknown>;

const NORMAL_CLOSURE_CODE = 1000;
const AUTHENTICATION_FAILURE_CODE = 4001;

function createRequestId(): string {
  return [
    Date.now().toString(36),
    Math.random().toString(36).slice(2, 10),
  ].join("-");
}

function safelyParseMessage(data: unknown): RealtimeEvent | null {
  if (typeof data !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(data) as unknown;

    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }

    const candidate = parsed as {
      event?: unknown;
      payload?: unknown;
      id?: unknown;
      timestamp?: unknown;
    };

    if (typeof candidate.event !== "string") {
      return null;
    }

    return {
      event: candidate.event,
      payload: candidate.payload,

      id: typeof candidate.id === "string" ? candidate.id : undefined,

      timestamp:
        typeof candidate.timestamp === "string"
          ? candidate.timestamp
          : undefined,
    };
  } catch {
    return null;
  }
}

export class RealtimeClient {
  private socket: WebSocket | null = null;

  private status: RealtimeStatus = "idle";

  private listeners = new Map<string, Set<UnknownListener>>();

  private statusListeners = new Set<RealtimeStatusListener>();

  private pendingMessages: RealtimeOutgoingMessage[] = [];

  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  private connectTimeout: ReturnType<typeof setTimeout> | null = null;

  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  private staleConnectionTimer: ReturnType<typeof setInterval> | null = null;

  private appStateSubscription: NativeEventSubscription | null = null;

  private networkSubscription: NetInfoSubscription | null = null;

  private reconnectAttempt = 0;
  private intentionallyDisconnected = false;
  private appIsActive = AppState.currentState === "active";
  private networkIsAvailable = true;
  private lastServerActivityAt = Date.now();

  private readonly options: Required<
    Omit<RealtimeClientOptions, "getAccessToken">
  > & {
    getAccessToken: RealtimeClientOptions["getAccessToken"];
  };

  constructor(options: RealtimeClientOptions) {
    this.options = {
      url: options.url,
      getAccessToken: options.getAccessToken,

      enabled: options.enabled ?? true,

      connectTimeoutMs: options.connectTimeoutMs ?? 15_000,

      initialReconnectDelayMs: options.initialReconnectDelayMs ?? 1_000,

      maxReconnectDelayMs: options.maxReconnectDelayMs ?? 30_000,

      maxReconnectAttempts:
        options.maxReconnectAttempts ?? Number.POSITIVE_INFINITY,

      heartbeatIntervalMs: options.heartbeatIntervalMs ?? 25_000,

      connectionStaleAfterMs: options.connectionStaleAfterMs ?? 60_000,

      authMode: options.authMode ?? "message",

      authQueryParameter: options.authQueryParameter ?? "access_token",
    };

    this.setupLifecycleListeners();
  }

  getStatus(): RealtimeStatus {
    return this.status;
  }

  isConnected(): boolean {
    return (
      this.socket?.readyState === WebSocket.OPEN && this.status === "connected"
    );
  }

  async connect(): Promise<void> {
    if (
      !this.options.enabled ||
      this.intentionallyDisconnected ||
      !this.appIsActive ||
      !this.networkIsAvailable
    ) {
      return;
    }

    if (
      this.socket?.readyState === WebSocket.OPEN ||
      this.socket?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    this.clearReconnectTimer();
    this.setStatus(this.reconnectAttempt > 0 ? "reconnecting" : "connecting");

    const token = await this.options.getAccessToken();

    if (!token) {
      this.setStatus("disconnected");

      logger.warn(
        "Realtime connection skipped because no access token exists",
        {
          category: "realtime",
        },
      );

      return;
    }

    const url =
      this.options.authMode === "query"
        ? this.createAuthenticatedUrl(token)
        : this.options.url;

    try {
      const socket = new WebSocket(url);

      this.socket = socket;
      this.installSocketHandlers(socket, token);

      this.startConnectTimeout(socket);
    } catch (error) {
      logger.error("Failed to create realtime connection", error, {
        category: "realtime",
      });

      this.socket = null;
      this.scheduleReconnect();
    }
  }

  /**
   * Disconnect and stop automatic reconnection.
   */
  disconnect(code = NORMAL_CLOSURE_CODE, reason = "Client disconnected"): void {
    this.intentionallyDisconnected = true;

    this.clearAllTimers();

    const socket = this.socket;
    this.socket = null;

    if (
      socket &&
      (socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING)
    ) {
      socket.close(code, reason);
    }

    this.reconnectAttempt = 0;
    this.setStatus("disconnected");
  }

  /**
   * Allow connection again after an intentional disconnect.
   */
  async reconnect(): Promise<void> {
    this.intentionallyDisconnected = false;

    this.forceCloseSocket(4000, "Client reconnect requested");

    await this.connect();
  }

  subscribe<TPayload>(
    event: string,
    listener: RealtimeListener<TPayload>,
  ): () => void {
    const listeners = this.listeners.get(event) ?? new Set<UnknownListener>();

    listeners.add(listener as UnknownListener);

    this.listeners.set(event, listeners);

    return () => {
      const current = this.listeners.get(event);

      current?.delete(listener as UnknownListener);

      if (current?.size === 0) {
        this.listeners.delete(event);
      }
    };
  }

  subscribeToStatus(listener: RealtimeStatusListener): () => void {
    this.statusListeners.add(listener);

    listener(this.status);

    return () => {
      this.statusListeners.delete(listener);
    };
  }

  send<TPayload>(event: string, payload?: TPayload): boolean {
    const message: RealtimeOutgoingMessage<TPayload> = {
      event,
      payload,
      requestId: createRequestId(),
    };

    if (!this.isConnected()) {
      this.enqueueMessage(message);

      return false;
    }

    return this.sendImmediately(message);
  }

  destroy(): void {
    this.disconnect();

    this.appStateSubscription?.remove();
    this.appStateSubscription = null;

    this.networkSubscription?.();
    this.networkSubscription = null;

    this.listeners.clear();
    this.statusListeners.clear();
    this.pendingMessages = [];
  }

  private installSocketHandlers(socket: WebSocket, token: string): void {
    socket.onopen = () => {
      if (this.socket !== socket) {
        socket.close();
        return;
      }

      this.clearConnectTimeout();
      this.lastServerActivityAt = Date.now();

      if (this.options.authMode === "message") {
        this.setStatus("authenticating");

        const authMessage: RealtimeAuthMessage = {
          event: "auth",
          payload: {
            token,
          },
        };

        socket.send(JSON.stringify(authMessage));

        /**
         * For servers that do not send `auth.success`,
         * mark connected immediately after sending auth.
         *
         * Prefer having the backend send an explicit
         * auth.success event.
         */
        this.handleConnected();
      } else {
        this.handleConnected();
      }
    };

    socket.onmessage = (event) => {
      if (this.socket !== socket) {
        return;
      }

      this.lastServerActivityAt = Date.now();

      const message = safelyParseMessage(event.data);

      if (!message) {
        logger.warn("Ignored malformed realtime message", {
          category: "realtime",
        });

        return;
      }

      this.handleMessage(message);
    };

    socket.onerror = () => {
      if (this.socket !== socket) {
        return;
      }

      logger.warn("Realtime socket reported an error", {
        category: "realtime",
        readyState: socket.readyState,
      });
    };

    socket.onclose = (event) => {
      if (this.socket !== socket) {
        return;
      }

      this.clearConnectionTimers();
      this.socket = null;

      logger.info("Realtime connection closed", {
        category: "realtime",
        code: event.code,
        reason: event.reason || undefined,
        clean: event.wasClean,
      });

      if (event.code === AUTHENTICATION_FAILURE_CODE) {
        this.setStatus("disconnected");

        /**
         * Let the HTTP refresh/session system obtain a valid token.
         * A later reconnect() can then use the newly resolved token.
         */
        return;
      }

      if (this.intentionallyDisconnected) {
        this.setStatus("disconnected");

        return;
      }

      this.scheduleReconnect();
    };
  }

  private handleConnected(): void {
    this.reconnectAttempt = 0;
    this.setStatus("connected");

    this.startHeartbeat();
    this.startStaleConnectionCheck();
    this.flushPendingMessages();

    logger.info("Realtime connection established", {
      category: "realtime",
    });
  }

  private handleMessage(message: RealtimeEvent): void {
    switch (message.event) {
      case "pong":
        return;

      case "auth.success":
        if (this.status === "authenticating") {
          this.handleConnected();
        }
        return;

      case "auth.failed":
      case "auth.expired":
        this.forceCloseSocket(
          AUTHENTICATION_FAILURE_CODE,
          "Realtime authentication failed",
        );
        return;
    }

    this.emit(message.event, message.payload);

    /**
     * Optional wildcard listener.
     */
    this.emit("*", message);
  }

  private emit(event: string, payload: unknown): void {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      try {
        listener(payload);
      } catch (error) {
        logger.error("Realtime event listener failed", error, {
          category: "realtime",
          event,
        });
      }
    }
  }

  private sendImmediately(message: RealtimeOutgoingMessage): boolean {
    const socket = this.socket;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return false;
    }

    try {
      socket.send(JSON.stringify(message));

      return true;
    } catch (error) {
      logger.error("Failed to send realtime message", error, {
        category: "realtime",
        event: message.event,
      });

      return false;
    }
  }

  private enqueueMessage(message: RealtimeOutgoingMessage): void {
    const maximumQueueLength = 100;

    if (this.pendingMessages.length >= maximumQueueLength) {
      this.pendingMessages.shift();

      logger.warn("Realtime outgoing queue reached its limit", {
        category: "realtime",
        limit: maximumQueueLength,
      });
    }

    this.pendingMessages.push(message);
  }

  private flushPendingMessages(): void {
    if (!this.isConnected()) {
      return;
    }

    const pending = [...this.pendingMessages];

    this.pendingMessages = [];

    for (const message of pending) {
      const sent = this.sendImmediately(message);

      if (!sent) {
        this.pendingMessages.unshift(message);

        break;
      }
    }
  }

  private scheduleReconnect(): void {
    if (
      this.intentionallyDisconnected ||
      !this.options.enabled ||
      !this.appIsActive ||
      !this.networkIsAvailable
    ) {
      this.setStatus("disconnected");

      return;
    }

    if (this.reconnectAttempt >= this.options.maxReconnectAttempts) {
      this.setStatus("disconnected");

      logger.warn("Realtime reconnect limit reached", {
        category: "realtime",
        attempts: this.reconnectAttempt,
      });

      return;
    }

    this.clearReconnectTimer();

    this.reconnectAttempt += 1;

    const exponentialDelay = Math.min(
      this.options.initialReconnectDelayMs * 2 ** (this.reconnectAttempt - 1),

      this.options.maxReconnectDelayMs,
    );

    /**
     * Full jitter avoids thousands of mobile clients reconnecting
     * at exactly the same moment after a backend outage.
     */
    const delay = Math.random() * exponentialDelay;

    this.setStatus("reconnecting");

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;

      void this.connect();
    }, delay);

    logger.info("Realtime reconnect scheduled", {
      category: "realtime",
      attempt: this.reconnectAttempt,
      delayMs: Math.round(delay),
    });
  }

  private startConnectTimeout(socket: WebSocket): void {
    this.clearConnectTimeout();

    this.connectTimeout = setTimeout(() => {
      if (
        this.socket === socket &&
        socket.readyState === WebSocket.CONNECTING
      ) {
        logger.warn("Realtime connection timed out", {
          category: "realtime",
        });

        this.forceCloseSocket(4008, "Connection timeout");
      }
    }, this.options.connectTimeoutMs);
  }

  private startHeartbeat(): void {
    this.clearHeartbeatTimer();

    this.heartbeatTimer = setInterval(() => {
      if (!this.isConnected()) {
        return;
      }

      this.sendImmediately({
        event: "ping",
        payload: {
          timestamp: new Date().toISOString(),
        },
      });
    }, this.options.heartbeatIntervalMs);
  }

  private startStaleConnectionCheck(): void {
    this.clearStaleConnectionTimer();

    const checkInterval = Math.max(
      5_000,
      Math.floor(this.options.connectionStaleAfterMs / 2),
    );

    this.staleConnectionTimer = setInterval(() => {
      if (!this.isConnected()) {
        return;
      }

      const inactiveFor = Date.now() - this.lastServerActivityAt;

      if (inactiveFor > this.options.connectionStaleAfterMs) {
        logger.warn("Realtime connection became stale", {
          category: "realtime",
          inactiveForMs: inactiveFor,
        });

        this.forceCloseSocket(4009, "Stale connection");
      }
    }, checkInterval);
  }

  private setupLifecycleListeners(): void {
    this.appStateSubscription = AppState.addEventListener(
      "change",
      this.handleAppStateChange,
    );

    this.networkSubscription = NetInfo.addEventListener((state) => {
      const wasAvailable = this.networkIsAvailable;

      this.networkIsAvailable =
        state.isConnected === true && state.isInternetReachable !== false;

      if (!this.networkIsAvailable) {
        this.clearReconnectTimer();
        this.forceCloseSocket(4002, "Network unavailable");

        this.setStatus("disconnected");

        return;
      }

      if (
        !wasAvailable &&
        this.appIsActive &&
        !this.intentionallyDisconnected
      ) {
        void this.connect();
      }
    });
  }

  private readonly handleAppStateChange = (nextState: AppStateStatus): void => {
    const wasActive = this.appIsActive;

    this.appIsActive = nextState === "active";

    if (!this.appIsActive) {
      this.clearReconnectTimer();

      /**
       * Keeping a socket alive in the background is unreliable
       * on mobile unless a dedicated background service is used.
       */
      this.forceCloseSocket(4003, "Application backgrounded");

      this.setStatus("disconnected");

      return;
    }

    if (
      !wasActive &&
      this.networkIsAvailable &&
      !this.intentionallyDisconnected
    ) {
      void this.connect();
    }
  };

  private createAuthenticatedUrl(token: string): string {
    const separator = this.options.url.includes("?") ? "&" : "?";

    return [
      this.options.url,
      separator,
      encodeURIComponent(this.options.authQueryParameter),
      "=",
      encodeURIComponent(token),
    ].join("");
  }

  private forceCloseSocket(code: number, reason: string): void {
    const socket = this.socket;

    this.socket = null;
    this.clearConnectionTimers();

    if (
      socket &&
      (socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING)
    ) {
      socket.close(code, reason);
    }
  }

  private setStatus(status: RealtimeStatus): void {
    if (this.status === status) {
      return;
    }

    this.status = status;

    for (const listener of this.statusListeners) {
      try {
        listener(status);
      } catch (error) {
        logger.error("Realtime status listener failed", error, {
          category: "realtime",
          status,
        });
      }
    }
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);

      this.reconnectTimer = null;
    }
  }

  private clearConnectTimeout(): void {
    if (this.connectTimeout) {
      clearTimeout(this.connectTimeout);

      this.connectTimeout = null;
    }
  }

  private clearHeartbeatTimer(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);

      this.heartbeatTimer = null;
    }
  }

  private clearStaleConnectionTimer(): void {
    if (this.staleConnectionTimer) {
      clearInterval(this.staleConnectionTimer);

      this.staleConnectionTimer = null;
    }
  }

  private clearConnectionTimers(): void {
    this.clearConnectTimeout();
    this.clearHeartbeatTimer();
    this.clearStaleConnectionTimer();
  }

  private clearAllTimers(): void {
    this.clearReconnectTimer();
    this.clearConnectionTimers();
  }
}
