import { env } from "@/config/env";
import { ApiError } from "@/lib/api/ApiError";
import {
  QueryValue,
  toQueryString,
} from "@/lib/api/queryString";
import { getAccessToken } from "@/lib/storage/authSessionStorage";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody> {
  method?: HttpMethod;
  query?: Record<string, QueryValue>;
  body?: TBody;
  auth?: boolean;
  signal?: AbortSignal;
  timeoutMs?: number;
  headers?: Record<string, string>;
}

function safeParseJson(text: string): unknown {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function apiRequest<TResponse, TBody = never>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const {
    method = "GET",
    query,
    body,
    auth = false,
    signal,
    timeoutMs = 15_000,
    headers,
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const abortFromParent = () => controller.abort();
  signal?.addEventListener("abort", abortFromParent, { once: true });

  try {
    const token = auth ? await getAccessToken() : null;

    if (auth && !token) {
      throw new ApiError("Authentication required", 401, null);
    }

    const response = await fetch(
      `${env.apiUrl}${path}${toQueryString(query)}`,
      {
        method,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(body !== undefined
            ? { "Content-Type": "application/json" }
            : {}),
          ...(token
            ? { Authorization: `Bearer ${token}` }
            : {}),
          ...headers,
        },
        body:
          body === undefined ? undefined : JSON.stringify(body),
      },
    );

    const rawText = await response.text();
    const data = safeParseJson(rawText);

    if (!response.ok) {
      throw ApiError.fromResponse(response.status, data);
    }

    return data as TResponse;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      throw new ApiError("Request timed out or was cancelled", 408, null);
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Network request failed",
      0,
      null,
    );
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abortFromParent);
  }
}
