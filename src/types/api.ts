export type ApiFailureCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "TIMEOUT"
  | "REQUEST_CANCELLED"
  | "NETWORK_UNAVAILABLE"
  | "SERVER_ERROR"
  | "SERVICE_UNAVAILABLE"
  | "UNKNOWN";

export interface ValidationIssue {
  field?: string;
  message: string;
  code?: string;
}

export interface ApiFailure {
  code: ApiFailureCode;
  message: string;

  /**
   * HTTP response status, if the server returned a response.
   */
  status?: number;

  /**
   * Backend request/correlation identifier.
   */
  requestId?: string;

  /**
   * Field-level validation errors.
   */
  validationIssues?: ValidationIssue[];

  /**
   * Optional machine-readable backend error code.
   */
  serverCode?: string;

  /**
   * Indicates whether retrying may reasonably succeed.
   */
  retryable: boolean;

  /**
   * Retry delay provided by the server, normally for HTTP 429.
   */
  retryAfterMs?: number;

  /**
   * Development-only technical context.
   */
  details?: unknown;
}

export interface ApiErrorEnvelope {
  message?: string;
  detail?: string;
  code?: string;
  requestId?: string;
  request_id?: string;
  correlationId?: string;
  errors?: unknown;
}



export interface ApiResponse<TData = unknown> {
  success: boolean;
  message?: string;
  data: TData;
  statusCode?: number;
  requestId?: string;
  timestamp?: string;
}

export interface ApiErrorResponse<TDetails = unknown> {
  success: false;
  message: string;
  code?: string;
  statusCode?: number;
  details?: TDetails;
  requestId?: string;
  timestamp?: string;
}

export interface PaginatedApiResponse<TItem> {
  success: boolean;
  message?: string;
  data: TItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  requestId?: string;
  timestamp?: string;
}