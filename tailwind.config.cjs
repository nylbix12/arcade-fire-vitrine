// tailwind.config.js (themes + spacing scale)
module.exports = {
  theme: {
    extend: {
      colors: { /* voir palette ci-dessus */ },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Rubik'", "sans-serif"],
      },
      spacing: {
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        12: "3rem",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },
};
