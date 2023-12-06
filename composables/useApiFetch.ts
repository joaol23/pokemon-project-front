import type { UseFetchOptions } from "nuxt/app";
import { useAuthStore } from "~/store/useAuthStore";

export async function useApiFetch<T>(
  path: string,
  options: UseFetchOptions<T> = {}
) {
  let headers: HeadersInit = {};

  const token = (await useCsrfCookie()).token;
  if (token) {
    headers["X-XSRF-TOKEN"] = token;
  }

  const auth = useAuthStore();
  if (auth.isLoggedIn) {
    headers["Authorization"] = `Bearer ${auth.authToken}`;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["referer", "cookie"]),
    };
  }

  return await useFetch(useRuntimeConfig().public.url_api + '/api' + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
}
