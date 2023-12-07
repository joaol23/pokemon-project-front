import type { UserInteface } from "~/data/@types/UserInterface";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserInteface | null>();
  const authToken = useCookie("auth_token", { default: () => null });
  const isLoggedIn = computed(() => !!user.value);

  async function login(credentials: { email: string; password: string }) {
    const { data, error } = await useApiFetch<any>("/auth/login", {
      method: "POST",
      body: credentials,
    });

    if (data.value) {
      authToken.value = data.value.data.token;
    }
    fetchUser();
    return { data, error };
  }

  async function fetchUser() {
    const { data, error } = await useApiFetch<any>("/auth/me");
    if (data.value) {
      user.value = data.value.data.user;
    }
  }

  async function logout() {
    const { data, error } = await useApiFetch<any>("/auth/logout", {
      method: "POST",
    });
    if (data.value?.data?.type) {
      authToken.value = null;
      user.value = null;
      navigateTo("/login");
    }
    return { data, error };
  }
  return { login, isLoggedIn, user, authToken, logout, fetchUser };
});
