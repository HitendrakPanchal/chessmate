// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// eslint-disable-next-line no-undef
module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content:[
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  // variants: {
  //   extend: {},
  // },
  plugins: [],
}
