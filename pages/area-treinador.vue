<script lang="ts" setup>
import { PokemonUserInterface } from "../data/@types/PokemonInterface";
import { useAuthStore } from "../store/useAuthStore";

const cookieSelectPokemon = useCookie<number | undefined>("select_pokemon");
cookieSelectPokemon.value = undefined;
const pokemonsUser = ref<PokemonUserInterface[]>([]);

const loadDataPokemons = async () => {
  const auth = useAuthStore();
  const { data } = await useApiFetch<{ data: PokemonUserInterface[] }>(
    `/user/${auth.user?.id}/pokemons`
  );

  pokemonsUser.value = data.value?.data || [];
};

const handleSelectPokemon = async (order: number) => {
  cookieSelectPokemon.value = order;
  await navigateTo("/");
};

useSeoMeta({
  title: "Área do Treinador",
});

onMounted(loadDataPokemons);
</script>

<template>
  <div class="flex justify-center items-center h-[93vh]">
    <div class="w-1/2 relative">
      <div
        class="grid grid-cols-3 w-full items-center justify-items-center h-[40vh] gap-2">
        <div
          v-for="i in 6"
          class="border-2 border-black px-8 rounded-md bg-lime-300">
          <img
            src="../static/poke_ball_icon.png"
            class="w-[100px] h-[100px] z-[5] cursor-pointer mix-blend-overlay"
            @click="handleSelectPokemon(i)"
            alt="pokebola" />
        </div>
      </div>
      <div
        class="grid grid-cols-3 grid-rows-2 w-full items-center justify-items-center absolute top-0 h-[40vh]">
        <div
          v-for="pokemon in pokemonsUser"
          class="w-9/12 flex flex-col justify-start items-center h-full cursor-pointer"
          @click="handleSelectPokemon(pokemon.pivot.order)">
          <div class="w-full flex justify-center mt-2">
            <img
              :key="pokemon.id"
              :src="pokemon.image"
              class="w-[80px] h-[70px] z-10"
              :class="{
                'row-start-2': pokemon.pivot.order > 3,
                ['col-start-' + pokemon.pivot.order]: pokemon.pivot.order <= 3,
                ['col-start-' + (pokemon.pivot.order - 3)]:
                  pokemon.pivot.order > 3,
              }"
              :alt="pokemon.name" />
          </div>
          <span class="text-center">{{ pokemon.name }}</span>
          <div class="w-7/12 h-[1px] bg-blue-400"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
