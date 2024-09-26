/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript and TypeScript files
  ],
  theme: {
    extend: {
      // You can add custom colors, spacing, etc. here
      colors: {
        primary: "#4F46E5", // Example primary color
        secondary: "#FBBF24", // Example secondary color
      },
      spacing: {
        72: "18rem", // Custom spacing example
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};
