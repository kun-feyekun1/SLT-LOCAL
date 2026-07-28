export interface ValidationIssue {
  loc?: Array<string | number>;
  msg?: string;
  type?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly data: unknown,
    public readonly validationIssues: ValidationIssue[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }

  static fromResponse(status: number, data: unknown): ApiError {
    let message = `Request failed with status ${status}`;
    let validationIssues: ValidationIssue[] = [];

    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;

      if (typeof record.detail === "string") {
        message = record.detail;
      } else if (Array.isArray(record.detail)) {
        validationIssues = record.detail.filter(
          (item): item is ValidationIssue =>
            !!item && typeof item === "object",
        );

        const first = validationIssues[0];
        if (first?.msg) message = first.msg;
      } else if (typeof record.message === "string") {
        message = record.message;
      }
    }

    return new ApiError(message, status, data, validationIssues);
  }
}
