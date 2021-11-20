module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url(/src/imgs/deliveries.png)"
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even'],
    },
  },
  plugins: [],
}
