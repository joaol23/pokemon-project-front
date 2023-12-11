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
