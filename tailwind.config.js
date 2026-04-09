/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        muted: "#5f6368",
        surface: "#f7f7f8",
        accent: "#0f172a",
      },
      boxShadow: {
        soft: "0 10px 30px -16px rgba(15, 23, 42, 0.35)",
        strong: "0 20px 40px -24px rgba(15, 23, 42, 0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        gradient: "gradient 15s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      fontFamily: {
        "dancing-script": ['"Dancing Script"', "cursive"],
      },
    },
  },
};
