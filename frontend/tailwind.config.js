/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cdarkblue: "rgba(2,0,36,1)",
        cblue: "rgba(9,9,121,1)",
        clighblue: "rgba(0,212,255,1)"
      }
    },
  },
  plugins: [],
}
