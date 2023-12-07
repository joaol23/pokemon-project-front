<script lang="ts" setup>
import { useAuthStore } from '../store/useAuthStore';
const auth = useAuthStore();
</script>

<template>
    <HeaderComponent /> 
    <slot />
</template>

<style scoped></style>
