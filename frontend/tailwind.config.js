/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Scans all JS/TS files in src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E"
      }
    },
  },
  plugins: [],
}