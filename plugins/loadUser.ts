import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtPlugin((nuxtApp) => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn && auth.authToken) {
    auth.fetchUser();
  }
});
