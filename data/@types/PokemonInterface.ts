export interface PokemonInterface {
  id: number;
  pokemon_id: number;
  name: string;
  image: string;
  types: TypeInterface[];
}

export interface TypeInterface {
  name: string;
  color: string;
}

export interface PokemonUserInterface extends PokemonInterface {
  pivot: {
    order: number;
    user_id: number;
    pokemon_id: number;
  };
}
