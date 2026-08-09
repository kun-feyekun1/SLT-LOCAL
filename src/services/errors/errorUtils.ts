import type { ApiFailureCode } from "@/types/api";

import { DerashApiError } from "./apiError";
import { normalizeApiError } from "./errorMapper";

export function isDerashApiError(error: unknown): error is DerashApiError {
  return error instanceof DerashApiError;
}

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error instanceof DerashApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
}

export function getFieldError(error: unknown, field: string): string | null {
  const normalized = normalizeApiError(error);

  return normalized.getFieldError(field);
}

export function hasFailureCode(error: unknown, code: ApiFailureCode): boolean {
  return error instanceof DerashApiError && error.code === code;
}

export function isUnauthorizedError(error: unknown): boolean {
  return hasFailureCode(error, "UNAUTHORIZED");
}

export function isRetryableError(error: unknown): boolean {
  return error instanceof DerashApiError && error.retryable;
}
