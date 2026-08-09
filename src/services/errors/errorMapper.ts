import axios, { AxiosError, isAxiosError } from "axios";

import type {
  ApiErrorEnvelope,
  ApiFailure,
  ApiFailureCode,
  ValidationIssue,
} from "@/types/api";

import { DerashApiError } from "./apiError";

const DEFAULT_MESSAGES: Record<ApiFailureCode, string> = {
  BAD_REQUEST: "The request could not be processed.",

  UNAUTHORIZED: "Your session has expired. Please sign in again.",

  FORBIDDEN: "You do not have permission to perform this action.",

  NOT_FOUND: "The requested resource could not be found.",

  CONFLICT: "The request conflicts with the current state of the resource.",

  VALIDATION_ERROR:
    "Some information is invalid. Please review the highlighted fields.",

  RATE_LIMITED: "Too many requests were made. Please try again shortly.",

  TIMEOUT: "The request took too long. Please try again.",

  REQUEST_CANCELLED: "The request was cancelled.",

  NETWORK_UNAVAILABLE:
    "Connection failed. Check your internet connection and try again.",

  SERVER_ERROR: "The server encountered an unexpected error.",

  SERVICE_UNAVAILABLE:
    "The service is temporarily unavailable. Please try again later.",

  UNKNOWN: "Something went wrong. Please try again.",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readNonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function resolveFailureCode(
  status?: number,
  axiosCode?: string,
): ApiFailureCode {
  if (axiosCode === "ECONNABORTED" || axiosCode === "ETIMEDOUT") {
    return "TIMEOUT";
  }

  if (status === undefined) {
    return "NETWORK_UNAVAILABLE";
  }

  switch (status) {
    case 400:
      return "BAD_REQUEST";

    case 401:
      return "UNAUTHORIZED";

    case 403:
      return "FORBIDDEN";

    case 404:
      return "NOT_FOUND";

    case 409:
      return "CONFLICT";

    case 422:
      return "VALIDATION_ERROR";

    case 429:
      return "RATE_LIMITED";

    case 502:
    case 503:
    case 504:
      return "SERVICE_UNAVAILABLE";

    default:
      return status >= 500 ? "SERVER_ERROR" : "UNKNOWN";
  }
}

function resolveRetryable(code: ApiFailureCode): boolean {
  return (
    code === "NETWORK_UNAVAILABLE" ||
    code === "TIMEOUT" ||
    code === "RATE_LIMITED" ||
    code === "SERVER_ERROR" ||
    code === "SERVICE_UNAVAILABLE"
  );
}

function resolveRequestId(
  error: AxiosError<ApiErrorEnvelope>,
): string | undefined {
  const data = error.response?.data;
  const headers = error.response?.headers;

  return (
    readNonEmptyString(data?.requestId) ??
    readNonEmptyString(data?.request_id) ??
    readNonEmptyString(data?.correlationId) ??
    readNonEmptyString(headers?.["x-request-id"]) ??
    readNonEmptyString(headers?.["x-correlation-id"])
  );
}

function resolveServerMessage(data: unknown): string | undefined {
  if (!isRecord(data)) {
    return undefined;
  }

  const message = readNonEmptyString(data.message);

  if (message) {
    return message;
  }

  const detail = data.detail;

  if (typeof detail === "string") {
    return readNonEmptyString(detail);
  }

  if (isRecord(detail)) {
    return (
      readNonEmptyString(detail.message) ?? readNonEmptyString(detail.detail)
    );
  }

  return undefined;
}

function resolveServerCode(data: unknown): string | undefined {
  if (!isRecord(data)) {
    return undefined;
  }

  return (
    readNonEmptyString(data.code) ??
    readNonEmptyString(data.errorCode) ??
    readNonEmptyString(data.error_code)
  );
}

function parseValidationIssues(data: unknown): ValidationIssue[] | undefined {
  if (!isRecord(data)) {
    return undefined;
  }

  const source = Array.isArray(data.errors)
    ? data.errors
    : Array.isArray(data.detail)
      ? data.detail
      : undefined;

  if (!source) {
    return undefined;
  }

  const issues: ValidationIssue[] = [];

  for (const item of source) {
    if (!isRecord(item)) {
      continue;
    }

    const location = Array.isArray(item.loc)
      ? item.loc
          .filter(
            (segment) =>
              typeof segment === "string" || typeof segment === "number",
          )
          .filter(
            (segment) =>
              segment !== "body" && segment !== "query" && segment !== "path",
          )
          .join(".")
      : undefined;

    const field =
      readNonEmptyString(item.field) ??
      readNonEmptyString(item.path) ??
      readNonEmptyString(location);

    const message =
      readNonEmptyString(item.message) ??
      readNonEmptyString(item.msg) ??
      "The value is invalid.";

    const code = readNonEmptyString(item.code) ?? readNonEmptyString(item.type);

    issues.push({
      field,
      message,
      code,
    });
  }

  return issues.length > 0 ? issues : undefined;
}

function parseRetryAfterMs(error: AxiosError): number | undefined {
  const header = error.response?.headers?.["retry-after"];

  if (typeof header === "number") {
    return header * 1_000;
  }

  if (typeof header !== "string") {
    return undefined;
  }

  const seconds = Number(header);

  if (Number.isFinite(seconds)) {
    return Math.max(0, seconds * 1_000);
  }

  const retryDate = Date.parse(header);

  if (Number.isNaN(retryDate)) {
    return undefined;
  }

  return Math.max(0, retryDate - Date.now());
}

export function mapAxiosError(
  error: AxiosError<ApiErrorEnvelope>,
): DerashApiError {
  if (axios.isCancel(error)) {
    return new DerashApiError(
      {
        code: "REQUEST_CANCELLED",
        message: DEFAULT_MESSAGES.REQUEST_CANCELLED,
        retryable: false,
      },
      { cause: error },
    );
  }

  const status = error.response?.status;

  const code = resolveFailureCode(status, error.code);

  const validationIssues =
    code === "VALIDATION_ERROR"
      ? parseValidationIssues(error.response?.data)
      : undefined;

  const failure: ApiFailure = {
    code,
    status,
    message:
      resolveServerMessage(error.response?.data) ?? DEFAULT_MESSAGES[code],

    requestId: resolveRequestId(error),

    serverCode: resolveServerCode(error.response?.data),

    validationIssues,
    retryable: resolveRetryable(code),

    retryAfterMs:
      code === "RATE_LIMITED" ? parseRetryAfterMs(error) : undefined,

    details: __DEV__
      ? {
          axiosCode: error.code,
          method: error.config?.method?.toUpperCase(),
          url: error.config?.url,
        }
      : undefined,
  };

  return new DerashApiError(failure, { cause: error });
}

export function normalizeApiError(error: unknown): DerashApiError {
  if (error instanceof DerashApiError) {
    return error;
  }

  if (isAxiosError<ApiErrorEnvelope>(error)) {
    return mapAxiosError(error);
  }

  if (error instanceof Error) {
    return new DerashApiError(
      {
        code: "UNKNOWN",
        message: error.message || DEFAULT_MESSAGES.UNKNOWN,
        retryable: false,
        details: __DEV__
          ? {
              originalName: error.name,
            }
          : undefined,
      },
      { cause: error },
    );
  }

  return new DerashApiError(
    {
      code: "UNKNOWN",
      message: DEFAULT_MESSAGES.UNKNOWN,
      retryable: false,
      details: __DEV__ ? error : undefined,
    },
    { cause: error },
  );
}
