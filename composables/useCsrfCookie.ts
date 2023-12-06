export const useCsrfCookie = async () => {
  const token = useCookie("XSRF-TOKEN");

  if (token.value) {
    return { token: token.value };
  }

  await useFetch(useRuntimeConfig().public.url_api + "/sanctum/csrf-cookie", {
    credentials: "include",
  });

  return { token: useCookie("XSRF-TOKEN").value };
};
