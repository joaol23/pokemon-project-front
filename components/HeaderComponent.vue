<script lang="ts" setup>
import { useAuthStore } from "../store/useAuthStore";
const auth = useAuthStore();

const handleLogout = async () => {
  const { data, error } = await auth.logout();
  
  if (error.value?.data) {
    alert(error.value?.data.message);
  }
};
</script>

<template>
  <header class="bg-red-400 flex justify-end h-[6vh] items-center">
    <div class="w-1/2 ml-4">
      <NuxtLink to="/">
        <img
          class="w-[30px] h-[30px]"
          src="../static/poke_ball_icon.png"
          alt="" />
      </NuxtLink>
    </div>
    <div class="w-1/2">
      <div class="w-full flex justify-evenly">
        <button>
          <NuxtLink
            class="transition-all text-white duration-200 hover:text-xl"
            to="/"
            >Home</NuxtLink
          >
        </button>
        <button v-if="!auth.isLoggedIn">
          <NuxtLink
            class="transition-all text-white duration-200 hover:text-xl"
            to="/login"
            >Login</NuxtLink
          >
        </button>
        <button v-if="!auth.isLoggedIn">
          <NuxtLink
            class="transition-all text-white duration-200 hover:text-xl"
            to="/register"
            >Register</NuxtLink
          >
        </button>
        <button v-if="auth.isLoggedIn">
          <NuxtLink
            class="transition-all text-white duration-200 hover:text-xl"
            @click.prevent="handleLogout"
            >Logout</NuxtLink
          >
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
