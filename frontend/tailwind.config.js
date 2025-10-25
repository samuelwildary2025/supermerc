/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E40AF',
        'secondary': '#DB2777',
        'accent': '#9333EA',
      }
    },
  },
  plugins: [],
}
