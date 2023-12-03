/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'azul-marino': '#153d6c'
      }
    },
  },
  plugins: [],
  // Agrega la configuración adicional
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")]
}

