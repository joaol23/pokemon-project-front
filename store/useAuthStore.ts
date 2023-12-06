import type { UserInteface } from "~/data/@types/UserInterface";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserInteface | null>();
  const authToken = useCookie("auth_token");
  const isLoggedIn = computed(() => !!user.value);

  async function login(credentials: { email: string; password: string }) {
    const { data, error } = await useApiFetch<any>("/login", {
      method: "POST",
      body: credentials,
    });

    if (data.value) {
      authToken.value = data.value.data.token;
    }
    return { data, error };
  }

  async function fetchUser() {}

  async function logout() {
    await useApiFetch<any>("/auth/logout");
    authToken.value = null;
    user.value = null;
    navigateTo('/login');
  }
  return { login, isLoggedIn, user, authToken, logout, fetchUser };
});
