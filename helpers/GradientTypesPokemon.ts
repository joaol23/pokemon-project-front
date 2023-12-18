import { TypeInterface } from "~/data/@types/PokemonInterface";

interface ColorMap {
  [key: string]: string;
}

const lightColor: ColorMap = {
  red: "from-red-300",
  blue: "from-blue-300",
  green: "from-green-300",
  yellow: "from-yellow-300",
  white: "from-white",
  lightblue: "from-blue-200",
  purple: "from-purple-300",
  pink: "from-pink-300",
  orange: "from-orange-300",
  gray: "from-gray-300",
  lime: "from-lime-300",
  darkgrey: "from-orange-800",
  black: "from-black",
  darkred: "from-red-800",
  darkblue: "from-blue-800",
  grey: "from-gray-300",
  lightpink: "from-pink-200",
};

const darkColor: ColorMap = {
  red: "to-red-500",
  blue: "to-blue-500",
  green: "to-green-500",
  yellow: "to-yellow-500",
  white: "to-white",
  lightblue: "to-blue-300",
  purple: "to-purple-500",
  pink: "to-pink-500",
  orange: "to-orange-500",
  gray: "to-gray-500",
  lime: "to-lime-500",
  darkgrey: "to-orange-800",
  black: "to-black",
  darkred: "to-red-800",
  darkblue: "to-blue-800",
  grey: "to-gray-500",
  lightpink: "to-pink-300",
};

export const getGradients = (types: TypeInterface[]): string => {
    if (types.length === 1) {
        return `${lightColor[types[0].color]} ${darkColor[types[0].color]}`;
    }

    return `${lightColor[types[0].color]} ${darkColor[types[1].color]}`;
};
