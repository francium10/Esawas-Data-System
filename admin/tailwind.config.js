/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: {
        500: "#0085C7",
        400: "#00A3D9",
        300: "#89B8DC",
      },
      green: {
        300: "#9BD3AE",
        400: "#4FA392",
        500: "#6EC207",
      },

      gray: {
        500: "#A6AEBF",
        400: "#C5D3E8",
        300: "#C4DAD2",
      },

      white: "#fff",
      black: "000",
      red: "#FA4032",
      "traffic-green": "#4CAF50", // Green for high effectiveness
      "traffic-yellow": "#FFEB3B", // Yellow for medium effectiveness
      "traffic-red": "#F44336", // Red for low effectiveness
      "traffic-gray": "#E0E0E0", // Gray for undefined/neutral
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
