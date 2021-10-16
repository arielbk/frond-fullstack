module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-purple': '#5267df',
        'custom-red': '#fa5959',
        'custom-blue': '#242a45',
        'custom-grey': '#9194a2',
        'custom-white': '#f7f7f7',
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        lg: '1200px',
        xl: '1200px',
        '2xl': '1200px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
