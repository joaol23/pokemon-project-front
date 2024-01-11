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

const removePokemon = async (order: number) => {
  const auth = useAuthStore();
  const { error } = await useApiFetch<{ data: PokemonUserInterface[] }>(
    `/user/${auth.user?.id}/pokemon/${order}`,
    {
      method: "delete",
    }
  );

  if (!error.value) {
    location.reload();
  }
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
        class="grid grid-cols-3 grid-rows-2 w-full items-center justify-items-center absolute top-0 h-[40vh]">
        <div
          v-for="pokemon in pokemonsUser"
          class="w-9/12 flex flex-col justify-start items-center h-full cursor-pointer relative"
          :class="{
            'row-start-2': pokemon.pivot.order > 3,
            ['col-start-' + pokemon.pivot.order]: pokemon.pivot.order <= 3,
            ['col-start-' + (pokemon.pivot.order - 3)]: pokemon.pivot.order > 3,
          }">
          <div
            class="border opacity-90 hover:opacity-100 border-purple-800 bg-purple-800 absolute right-0 rounded-full text-sm w-[20px] h-[20px] flex items-center justify-center"
            @click="removePokemon(pokemon.pivot.order)">
            X
          </div>
          <div
            class="w-full flex justify-center mt-2"
            @click="handleSelectPokemon(pokemon.pivot.order)">
            <img
              :key="pokemon.id"
              :src="pokemon.image"
              class="w-[80px] h-[70px] z-10"
              :alt="pokemon.name" />
          </div>
          <span class="text-center">{{ pokemon.name }}</span>
          <div class="w-7/12 h-[1px] bg-blue-400"></div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<style scoped></style>
