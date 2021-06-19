module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'benne': ['"Benne"', 'serif'],
        'spectral': ['"Spectral"', 'serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

