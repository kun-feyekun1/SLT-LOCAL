import type {
  LogEntry,
  LoggerConfiguration,
  LoggerTransport,
  LogLevel,
  LogMeta,
} from "./logger.types";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const REDACTED_VALUE = "[REDACTED]";

const SENSITIVE_KEYS = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "password",
  "passcode",
  "pin",
  "otp",
  "secret",
  "token",
  "accesstoken",
  "access_token",
  "refreshtoken",
  "refresh_token",
  "apikey",
  "api_key",
  "clientsecret",
  "client_secret",
  "creditcard",
  "cardnumber",
  "cvv",
]);

const MAX_DEPTH = 5;
const MAX_ARRAY_LENGTH = 30;
const MAX_STRING_LENGTH = 2_000;

function normalizeKey(key: string): string {
  return key.replace(/[-\s]/g, "").toLowerCase();
}

function isSensitiveKey(key: string): boolean {
  return SENSITIVE_KEYS.has(normalizeKey(key));
}

function truncateString(value: string): string {
  if (value.length <= MAX_STRING_LENGTH) {
    return value;
  }

  return `${value.slice(0, MAX_STRING_LENGTH)}…[truncated]`;
}

function sanitizeValue(
  value: unknown,
  depth = 0,
  seen = new WeakSet<object>(),
): unknown {
  if (depth > MAX_DEPTH) {
    return "[MAX_DEPTH]";
  }

  if (
    value === null ||
    value === undefined ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (typeof value === "string") {
    return truncateString(value);
  }

  if (typeof value === "bigint") {
    return value.toString();
  }

  if (typeof value === "function") {
    return `[Function ${value.name || "anonymous"}]`;
  }

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: __DEV__ ? value.stack : undefined,
    };
  }

  if (typeof value !== "object") {
    return String(value);
  }

  if (seen.has(value)) {
    return "[CIRCULAR]";
  }

  seen.add(value);

  if (Array.isArray(value)) {
    return value
      .slice(0, MAX_ARRAY_LENGTH)
      .map((item) => sanitizeValue(item, depth + 1, seen));
  }

  const result: Record<string, unknown> = {};

  for (const [key, nestedValue] of Object.entries(value)) {
    result[key] = isSensitiveKey(key)
      ? REDACTED_VALUE
      : sanitizeValue(nestedValue, depth + 1, seen);
  }

  return result;
}

function sanitizeMeta(meta?: LogMeta): LogMeta | undefined {
  if (!meta) {
    return undefined;
  }

  const sanitized = sanitizeValue(meta);

  return typeof sanitized === "object" &&
    sanitized !== null &&
    !Array.isArray(sanitized)
    ? (sanitized as LogMeta)
    : { value: sanitized };
}

function serializeError(error?: unknown): LogEntry["error"] {
  if (error === undefined) {
    return undefined;
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: __DEV__ ? error.stack : undefined,
    };
  }

  return {
    name: "UnknownError",
    message:
      typeof error === "string" ? error : "A non-Error value was thrown.",
  };
}

class ConsoleTransport implements LoggerTransport {
  log(entry: LogEntry): void {
    const prefix = `[Derash] [${entry.level.toUpperCase()}]`;

    const args = [prefix, entry.message, entry.meta ?? "", entry.error ?? ""];

    switch (entry.level) {
      case "debug":
        console.debug(...args);
        break;

      case "info":
        console.info(...args);
        break;

      case "warn":
        console.warn(...args);
        break;

      case "error":
        console.error(...args);
        break;
    }
  }
}

class Logger {
  private minimumLevel: LogLevel = __DEV__ ? "debug" : "warn";

  private transports: LoggerTransport[] = __DEV__
    ? [new ConsoleTransport()]
    : [];

  private context: LogMeta = {};

  configure(configuration: LoggerConfiguration): void {
    if (configuration.minimumLevel) {
      this.minimumLevel = configuration.minimumLevel;
    }

    if (configuration.transports) {
      this.transports = [...configuration.transports];
    }

    if (configuration.context) {
      this.context = {
        ...this.context,
        ...configuration.context,
      };
    }
  }

  addTransport(transport: LoggerTransport): () => void {
    this.transports.push(transport);

    return () => {
      this.transports = this.transports.filter(
        (candidate) => candidate !== transport,
      );
    };
  }

  setContext(context: LogMeta): void {
    this.context = {
      ...this.context,
      ...context,
    };
  }

  clearContext(): void {
    this.context = {};
  }

  debug(message: string, meta?: LogMeta): void {
    this.write("debug", message, meta);
  }

  info(message: string, meta?: LogMeta): void {
    this.write("info", message, meta);
  }

  warn(message: string, meta?: LogMeta): void {
    this.write("warn", message, meta);
  }

  error(message: string, error?: unknown, meta?: LogMeta): void {
    this.write("error", message, meta, error);
  }

  private write(
    level: LogLevel,
    message: string,
    meta?: LogMeta,
    error?: unknown,
  ): void {
    if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[this.minimumLevel]) {
      return;
    }

    const entry: LogEntry = {
      level,
      message: truncateString(message),
      timestamp: new Date().toISOString(),

      meta: sanitizeMeta({
        ...this.context,
        ...meta,
      }),

      error: serializeError(error),
    };

    for (const transport of this.transports) {
      try {
        const result = transport.log(entry);

        if (result instanceof Promise) {
          void result.catch((transportError) => {
            if (__DEV__) {
              console.warn("[Derash] Logger transport failed", transportError);
            }
          });
        }
      } catch (transportError) {
        if (__DEV__) {
          console.warn("[Derash] Logger transport failed", transportError);
        }
      }
    }
  }
}

export const logger = new Logger();
