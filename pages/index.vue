<template>
  <div class="bg-gray-300">
    <div class="flex justify-center">
      <h1 class="text-4xl mt-4">Pokemons</h1>
    </div>
    <PokemonsPokemonList :pokemons="pokemons" />
    <ListPaginationComponent
      :last-page="lastPage"
      :pages="pages"
      :current-page="currentPage" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import {
  PaginateInterface,
  LinksPaginationInterface,
} from "../data/@types/PaginationInterface";
import { PokemonInterface } from "../data/@types/PokemonInterface";

const pokemons = ref<PokemonInterface[]>([]);
const currentPage = ref<number>(1);
const lastPage = ref<number>(1);
const pages = ref<LinksPaginationInterface[]>([]);
const route = useRoute();

const loadDataPokemons = async () => {
  const page = parseInt(route.query.page as string) || 1;
  const { data } = await useApiFetch<PaginateInterface<PokemonInterface>>(
    `/pokemons?page=${page}`,
    {
      key: `pokemons_list_${page}`,
    }
  );

  pokemons.value = data.value?.data || [];
  currentPage.value = data.value?.current_page || 1;
  lastPage.value = data.value?.last_page || 1;
  pages.value = data.value?.links || [];
};

useSeoMeta({
  title: 'Lista Pokemons',
})


onMounted(loadDataPokemons);
watch(
  () => route.query,
  () => {
    loadDataPokemons();
  }
);
</script>
