/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'azul-marino': '#153d6c'
      }
    },
  },
  // Agrega la configuración adicional
  darkMode: "class",
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require('flowbite/plugin'),
    ({
      charts: true,
  }),
    // Puedes agregar otros plugins aquí si es necesario
  ]
};

