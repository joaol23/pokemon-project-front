
module.exports = {
    plugins: [
        // ...
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
    ],
    theme: {
        screens: {
            'sm': { 'max': '639px' },
            'md': { 'max': '767px' },
            'lg': { 'max': '1023px', 'min': '768px' },
            'xl': { 'max': '1279px', 'min': '1024px'},
            '2xl': { 'min': '1280px'},
        },
    },
    content: [
        './pages/**/*.{vue}',
        './components/**/*.{vue}',
        './helpers/**/*.{ts,js}'
    ],
}