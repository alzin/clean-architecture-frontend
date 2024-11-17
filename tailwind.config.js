/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify files to scan for classes
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  // Dark mode configuration
  darkMode: "class", // or 'media'

  // Theme customization
  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        secondary: {
          // Add your secondary color palette
        },
      },

      // Custom spacing
      spacing: {
        128: "32rem",
        144: "36rem",
      },

      // Custom border radius
      borderRadius: {
        "4xl": "2rem",
      },

      // Custom font families
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },

  // Plugins
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
