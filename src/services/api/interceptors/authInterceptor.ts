import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { tokenStorage } from "@/services/storage/tokenStorage";

const AUTHORIZATION_HEADER = "Authorization";
const BEARER_SCHEME = "Bearer";

async function attachAccessToken(
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
  if (config.skipAuth) {
    config.headers.delete(AUTHORIZATION_HEADER);

    return config;
  }

  const accessToken = await tokenStorage.getAccessToken();

  if (!accessToken) {
    config.headers.delete(AUTHORIZATION_HEADER);

    return config;
  }

  config.headers.set(AUTHORIZATION_HEADER, `${BEARER_SCHEME} ${accessToken}`);

  return config;
}

/**
 * Installs the authentication request interceptor.
 *
 * Returns the interceptor ID so it can be removed in tests
 * or during controlled teardown.
 */
export function installAuthInterceptor(client: AxiosInstance): number {
  return client.interceptors.request.use(attachAccessToken, (error) =>
    Promise.reject(error),
  );
}

export function ejectAuthInterceptor(
  client: AxiosInstance,
  interceptorId: number,
): void {
  client.interceptors.request.eject(interceptorId);
}
