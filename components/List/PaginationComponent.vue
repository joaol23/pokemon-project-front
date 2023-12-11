<script setup lang="ts">
import { LinksPaginationInterface } from '../../data/@types/PaginationInterface';
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

defineEmits(["change-pagination"]);
</script>
<template>

  <nav class="flex justify-end py-4 mr-12">
    <div class="w-3/12 flex justify-end">
      <nuxt-link
        :to="{ path: '/', query: { page: currentPage - 1 } }"
        v-if="currentPage > 1"
        class="px-4 py-2 mx-1 bg-blue-400 rounded-full">
        &laquo;
      </nuxt-link>

      <nuxt-link
        v-for="page in pages"
        :key="page.label"
        :to="{ path: '/', query: { page: page.label } }">
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
        :to="{ path: '/', query: { page: currentPage + 1 } }"
        v-if="currentPage < lastPage"
        class="px-4 py-2 mx-1 bg-blue-400 rounded-full">
        &raquo;
      </nuxt-link>
    </div>
  </nav>
</template>