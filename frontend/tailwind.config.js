/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // enable dark mode using class strategy
  theme: {
    extend: {
      colors: {
        primary: "#1877F2",   // Blogbook Blue (like Facebook)
        secondary: "#F0F2F5", // Light gray background
        accent: "#42B72A",    // Green accent (buttons/links)
        dark: {
          bg: "#18191A",      // Dark mode background
          card: "#242526",    // Dark card
          text: "#E4E6EB",    // Dark mode text
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // clean modern font
        heading: ["Poppins", "sans-serif"], // headings
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.1)", // soft card shadow
        nav: "0 2px 6px rgba(0,0,0,0.08)",  // navbar shadow
      },
      borderRadius: {
        xl: "1rem", // smoother rounded corners
        "2xl": "1.5rem"
      },
      spacing: {
        128: "32rem", // for big containers
        144: "36rem",
      },
      transitionProperty: {
        "height": "height",
        "spacing": "margin, padding",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),     // better styled forms
    require("@tailwindcss/typography"), // better blog text formatting
    require("@tailwindcss/aspect-ratio") // responsive blog images
  ],
};
