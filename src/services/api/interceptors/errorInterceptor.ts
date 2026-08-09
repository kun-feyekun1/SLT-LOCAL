import type { AxiosInstance, AxiosResponse } from "axios";

import { mapAxiosError } from "@/services/errors";
import { logger } from "@/services/logging/logger";

function passResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

export function installErrorInterceptor(client: AxiosInstance): number {
  return client.interceptors.response.use(
    passResponse,

    (error) => {
      const apiError = mapAxiosError(error);

      if (apiError.code !== "REQUEST_CANCELLED") {
        logger.warn("API request failed", {
          category: "api",
          code: apiError.code,
          status: apiError.status,
          requestId: apiError.requestId,
          retryable: apiError.retryable,
        });
      }

      return Promise.reject(apiError);
    },
  );
}

export function ejectErrorInterceptor(
  client: AxiosInstance,
  interceptorId: number,
): void {
  client.interceptors.response.eject(interceptorId);
}
