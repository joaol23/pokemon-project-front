<script setup lang="ts">
import { LinksPaginationInterface } from "../../data/@types/PaginationInterface";
defineProps({
  lastPage: {
    type: Number,
    required: true,
  },
  pages: {
    type: Array as PropType<LinksPaginationInterface[]>,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const route = useRoute();

defineEmits(["change-pagination"]);
</script>
<template>
  <nav class="flex justify-center py-4 w-full">
    <div class="w-3/4 flex 2xl:justify-center 2xl:overflow-x-auto xl:justify-center xl:overflow-x-auto overflow-x-scroll">
      <nuxt-link
        :to="{ path: route.path, query: { page: currentPage - 1 } }"
        v-if="currentPage > 1"
        class="px-4 py-2 mx-1 bg-blue-400 rounded-full">
        &laquo;
      </nuxt-link>

      <nuxt-link
        v-if="pages.length > 3"
        v-for="page in pages"
        :key="page.label"
        :to="{ path: route.path, query: { page: page.label } }">
        <div
          :class="{ 'bg-blue-500 text-white': page.active }"
          class="px-4 py-2 mx-1 bg-blue-400 rounded-full"
          v-if="
            !(page.label.includes('Next') || page.label.includes('Previous'))
          ">
          {{ page.label }}
        </div>
      </nuxt-link>

      <nuxt-link
        :to="{ path: route.path, query: { page: currentPage + 1 } }"
        v-if="currentPage < lastPage"
        class="px-4 py-2 mx-1 bg-blue-400 rounded-full">
        &raquo;
      </nuxt-link>
    </div>
  </nav>
</template>
