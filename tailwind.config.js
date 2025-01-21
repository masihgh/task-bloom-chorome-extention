/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        vazirmatn: ['Vazirmatn', 'Roboto', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
    },
  },
  daisyui: {
    themes: [{
      light: {
        "neutral": "#3d4451",
        "base-content": "#1b1e27",
        "base-100": "#cbced7",
        "base-200": "#ecebf0",
        "base-300": "#ecebf0",
        "success": "#b7d93d",
        "error": "#c90010",
        "info": "#0055fe",
        "--rounded-box": "0.375rem",
        "--rounded-btn": "0.375rem",
        "--rounded-badge": "1.9rem",
        "--animation-btn": "0.25s",
        "--animation-input": "0.2s",
        "--btn-focus-scale": "1",
        "--border-btn": "1px",
        "--tab-border": "1px",
        "--tab-radius": "0.5rem"
      },
      dark: {
        "neutral": "#e2e1e7",
        "base-content": "#cbced7",
        "base-100": "#1b1e27",
        "base-200": "#2f313e",
        "base-300": "#3f4253",
        "success": "#b7d93d",
        "error": "#c90010",
        "info": "#0055fe",
        "--rounded-box": "0.375rem",
        "--rounded-btn": "0.375rem",
        "--rounded-badge": "1.9rem",
        "--animation-btn": "0.25s",
        "--animation-input": "0.2s",
        "--btn-focus-scale": "1",
        "--border-btn": "1px",
        "--tab-border": "1px",
        "--tab-radius": "0.5rem"
      }
    }],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

