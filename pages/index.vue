<template>
  <div class="flex justify-center md:flex-col items-center">
    <div
      class="flex items-center justify-start w-1/2 ml-12 md:justify-center md:ml-0">
      <h1 class="text-4xl text-gray-200 mt-4">Pokemons</h1>
    </div>

    <div
      class="flex items-end justify-end w-1/2 md:justify-center md:items-center">
      <input
        class="rounded-lg h-[30px] mr-14 md:mr-0 bg-blue-600 border-black"
        v-model="search"
        @input="searchPokemons()"
        type="text" />
    </div>
  </div>

  <ModalModalComponent></ModalModalComponent>
  <PokemonsPokemonList :pokemons="pokemons" v-if="pokemons.length" />
  <LoadingsPokemonLoadingList
    v-if="isLoading"
    class="flex justify-center text-white" />
  <div
    v-if="!isLoading && !pokemons.length"
    class="flex justify-center mt-10 w-full">
    <div class="bg-red-400 p-6 rounded-md w-full text-center mx-10">
      Nenhum pokemon encontrado!
    </div>
  </div>
  <ListPaginationComponent
    :last-page="lastPage"
    :pages="pages"
    :current-page="currentPage" />
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import {
  PaginateInterface,
  LinksPaginationInterface,
} from "../data/@types/PaginationInterface";
import { PokemonInterface } from "../data/@types/PokemonInterface";

const search = ref<string>("");
const isLoading = ref<boolean>(true);

const pokemons = ref<PokemonInterface[]>([]);
const currentPage = ref<number>(1);
const lastPage = ref<number>(1);
const pages = ref<LinksPaginationInterface[]>([]);
const route = useRoute();

const loadDataPokemons = async (search?: string) => {
  isLoading.value = true;
  const page = parseInt(route.query.page as string) || 1;
  const { data } = await useApiFetch<PaginateInterface<PokemonInterface>>(
    `/pokemons?page=${page}${search ? `&q=${search}` : ""}`,
    {
      key: `pokemons_list_${page}`,
    }
  );
  isLoading.value = false;

  pokemons.value = data.value?.data || [];
  currentPage.value = data.value?.current_page || 1;
  lastPage.value = data.value?.last_page || 1;
  pages.value = data.value?.links || [];
};

const searchPokemons = async () => {
  const router = useRouter();
  router.push({ query: { page: "1" } });

  pokemons.value = [];
  isLoading.value = true;
  loadDataPokemons(search.value);
};

useSeoMeta({
  title: "Lista Pokemons",
});

onMounted(loadDataPokemons);
watch(
  () => route.query,
  () => {
    pokemons.value = [];
    loadDataPokemons();
  }
);
</script>
