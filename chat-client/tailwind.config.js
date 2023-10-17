module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // This is the only line we need to change
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '300px': '300px' // or any desired height for the sliding effect
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
