import type { ApiFailure, ApiFailureCode, ValidationIssue } from "@/types/api";

export interface DerashApiErrorOptions {
  cause?: unknown;
}

export class DerashApiError extends Error {
  readonly failure: ApiFailure;
  readonly code: ApiFailureCode;
  readonly status?: number;
  readonly requestId?: string;
  readonly retryable: boolean;
  readonly validationIssues: readonly ValidationIssue[];

  constructor(failure: ApiFailure, options: DerashApiErrorOptions = {}) {
    super(failure.message);

    this.name = "DerashApiError";
    this.failure = Object.freeze({
      ...failure,
      validationIssues: failure.validationIssues
        ? [...failure.validationIssues]
        : undefined,
    });

    this.code = failure.code;
    this.status = failure.status;
    this.requestId = failure.requestId;
    this.retryable = failure.retryable;
    this.validationIssues = Object.freeze(
      failure.validationIssues ? [...failure.validationIssues] : [],
    );

    if (options.cause !== undefined) {
      Object.defineProperty(this, "cause", {
        value: options.cause,
        enumerable: false,
        configurable: true,
      });
    }

    /**
     * Helpful for JavaScript engines where extending Error does not
     * automatically preserve the correct prototype chain.
     */
    Object.setPrototypeOf(this, new.target.prototype);
  }

  isUnauthorized(): boolean {
    return this.code === "UNAUTHORIZED";
  }

  isValidationError(): boolean {
    return this.code === "VALIDATION_ERROR";
  }

  isNetworkError(): boolean {
    return this.code === "NETWORK_UNAVAILABLE";
  }

  isRetryable(): boolean {
    return this.retryable;
  }

  getFieldError(field: string): string | null {
    return (
      this.validationIssues.find((issue) => issue.field === field)?.message ??
      null
    );
  }

  toJSON(): ApiFailure {
    return this.failure;
  }
}
