<script lang="ts" setup></script>

<template>
  <HeaderComponent />
  <main class="min-h-[93vh] bg-gray-900">
    <slot />
  </main>
</template>

<style>
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #888;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #A2B4F4;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
html {
    height: 100%;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
</style>
