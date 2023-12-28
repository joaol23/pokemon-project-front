interface ColorMap {
  [key: string]: string;
}

export const getColorClass = (type: string): string => {
    const colorMap: ColorMap = {
        red: "bg-red-500 text-white",
        blue: "bg-blue-500 text-white",
        green: "bg-green-500 text-white",
        yellow: "bg-yellow-500 text-white",
        white: "bg-white text-gray-500",
        lightblue: "bg-blue-200 text-gray-500",
        purple: "bg-purple-500 text-white",
        pink: "bg-pink-500 text-white",
        orange: "bg-orange-500 text-white",
        gray: "bg-gray-500 text-white",
        lime: "bg-lime-500 text-white",
        darkgrey: "bg-orange-800 text-white",
        black: "bg-black text-white",
        darkred: "bg-red-800 text-white",
        darkblue: "bg-blue-800 text-white",
        grey: "bg-gray-500 text-white",
        lightpink: "bg-pink-200 text-white",
        brown: "bg-orange-900 text-white",
    };

    return colorMap[type] || "bg-gray-500 text-white";
};
