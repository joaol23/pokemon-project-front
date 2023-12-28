<script lang="ts" setup>
import { useAuthStore } from "../store/useAuthStore";
const auth = useAuthStore();

const handleLogout = async () => {
  const { error } = await auth.logout();

  if (error.value?.data) {
    alert(error.value?.data.message);
  }
};
</script>

<template>
  <client-only>
    <header class="bg-blue-900 flex justify-end h-[7vh] items-center">
      <div class="w-1/2 ml-4">
        <NuxtLink to="/" prefetch>
          <img
            class="w-[30px] h-[30px] mix-blend-screen"
            src="../static/poke_ball_icon.png"
            alt="" />
        </NuxtLink>
      </div>
      <div class="w-1/2 sm:hidden">
        <div class="w-full flex justify-evenly">
          <button>
            <NuxtLink
              class="transition-all text-white duration-200 hover:text-xl select-none"
              to="/"
              >Home</NuxtLink
            >
          </button>
          <button v-if="!auth.isLoggedIn">
            <NuxtLink
              class="transition-all text-white duration-200 hover:text-xl select-none"
              to="/login"
              >Login</NuxtLink
            >
          </button>
          <button v-if="!auth.isLoggedIn">
            <NuxtLink
              class="transition-all text-white duration-200 hover:text-xl select-none"
              to="/register"
              >Register</NuxtLink
            >
          </button>
          <button v-if="auth.isLoggedIn">
            <NuxtLink
              class="transition-all text-white duration-200 hover:text-xl select-none"
              to="/area-treinador"
              >Área Treinador</NuxtLink
            >
          </button>
          <button v-if="auth.isLoggedIn">
            <NuxtLink
              class="transition-all text-white duration-200 hover:text-xl select-none"
              @click.prevent="handleLogout"
              >Logout</NuxtLink
            >
          </button>
        </div>
      </div>
    </header>
  </client-only>
</template>

<style scoped></style>
