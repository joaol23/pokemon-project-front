<script setup lang="ts">
import { PokemonInterface } from "../../data/@types/PokemonInterface";
import { getColorClass } from "../../helpers/ColorTypesPokemon";
import { useAuthStore } from "../../store/useAuthStore";

const isSelectingPokemon =
  useCookie<number>("select_pokemon").value !== undefined;

const auth = await useAuthStore();

const handleSelectPokemon = async (pokemonId: number) => {
  const order = useCookie<number | undefined>("select_pokemon");
  if (!order) {
    alert("error");
  }
  await useApiFetch(`/user/${auth.user?.id}/pokemon/${pokemonId}`, {
    method: "POST",
    body: {
      order: order.value,
    },
  });

  order.value = undefined;
  navigateTo("/area-treinador");
};

defineProps({
  pokemons: {
    type: Array as PropType<PokemonInterface[]>,
    required: true,
  },
});
</script>

<template>
  <div
    class="grid grid-cols-5 lg:grid-cols-3 mx-[50px] my-[25px] gap-2 md:grid-cols-2 sm:m-0">
    <div
      v-for="item in pokemons"
      :key="item.id"
      class="max-h-[14rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex justify-start items-center flex-row">
        <img
          class="rounded-t-lg"
          v-bind:src="item.image"
          v-bind:alt="item.name" />
        <div class="flex justify-start flex-row md:flex-col">
          <div
            v-for="types in item.types"
            :key="types.name + '_' + item.name"
            class="md:mt-2">
            <span
              :class="getColorClass(types.color)"
              class="rounded-full px-2 py-1 text-[12px] font-semibold mr-2 mb-2"
              >{{ types.name }}</span
            >
          </div>
        </div>
      </div>
      <div class="px-2">
        <h5
          class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {{ item.name }}
        </h5>
        <a
          href="#"
          class="inline-flex mb-2 items-center px-2 py-2 text-[12px] font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Informações
        </a>
        <a
          v-if="isSelectingPokemon && auth.isLoggedIn"
          @click="handleSelectPokemon(item.id)"
          class="cursor-pointer inline-flex ml-2 mb-2 items-center px-2 py-2 text-[12px] font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Select
        </a>
      </div>
    </div>
  </div>
</template>
