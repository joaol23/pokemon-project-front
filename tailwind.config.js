
module.exports = {
    plugins: [
        // ...
        require('@tailwindcss/forms'),
    ],
    theme: {
        screens: {
            'sm': { 'max': '639px' },
            'md': { 'max': '767px' },
            'lg': { 'max': '1023px' },
            'xl': { 'max': '1279px' },
            '2xl': { 'max': '1280px' },

        }
    },
    content: [
        './pages/**/*.{vue}',
        './components/**/*.{vue}',
        './helpers/**/*.{ts,js}'
    ],
}