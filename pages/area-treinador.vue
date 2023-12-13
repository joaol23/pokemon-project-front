<script lang="ts" setup>
import { PokemonUserInterface } from '../data/@types/PokemonInterface';
import { useAuthStore } from "../store/useAuthStore";

const pokemonsUser = ref<PokemonUserInterface[]>([]);

const loadDataPokemons = async () => {
  const auth = useAuthStore();
  const { data } = await useApiFetch<{ data: PokemonUserInterface[] }>(
    `/user/${auth.user?.id}/pokemons`
  );

  pokemonsUser.value = data.value?.data || [];
};

const handleSelectPokemon = async (order: number) => {
  const cookieSelectPokemon = useCookie<number>("select_pokemon");
  cookieSelectPokemon.value = order;
  await navigateTo("/");
};

onMounted(loadDataPokemons);
</script>

<template>
  <div class="bg-gray-400">
    <div class="flex">
      <div class="w-1/2"></div>
      <div class="w-1/2 relative">
        <div class="grid grid-cols-3 w-full items-center justify-items-center">
          <img
            v-for="i in 6"
            src="../static/poke_ball_icon.png"
            class="w-[100px] h-[100px] z-[5]"
            @click="handleSelectPokemon(i)"
            alt="pokebola" />
        </div>
        <div
          class="grid grid-cols-3 grid-rows-2 w-full items-center justify-items-center absolute top-0">
          <img
            v-for="pokemon in pokemonsUser"
            :key="pokemon.id"
            :src="pokemon.image"
            @click="handleSelectPokemon(pokemon.pivot.order)"
            class="w-[100px] h-[100px] z-10"
            :class="{
              'row-start-2': pokemon.pivot.order > 3,
              ['col-start-' + pokemon.pivot.order]: pokemon.pivot.order <= 3,
              ['col-start-' + (pokemon.pivot.order - 3)]: pokemon.pivot.order > 3
            }"
            :alt="pokemon.name" />  
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
