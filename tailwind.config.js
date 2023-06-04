/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  plugins: [daisyui],
    theme: {
    extend: {},
  },
  daisyui: {
    theme: ["dark"]
  },
  purge: ["./index.html",'./src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
  darkMode: false, // or 'media' or 'class'
}

