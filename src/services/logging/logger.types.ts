export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogMeta = Record<string, unknown>;

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  meta?: LogMeta;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

export interface LoggerTransport {
  log(entry: LogEntry): void | Promise<void>;
}

export interface LoggerConfiguration {
  minimumLevel?: LogLevel;
  transports?: LoggerTransport[];
  context?: LogMeta;
}
