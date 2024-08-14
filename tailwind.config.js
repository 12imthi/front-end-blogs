/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary : 'gray',
        primary : '#000000',
        accent : '#D9D6D6'
      }
    },
  },
  plugins: [],
}

