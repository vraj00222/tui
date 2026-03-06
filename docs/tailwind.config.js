/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "term-bg": "#0d1117",
        "term-surface": "#161b22",
        "term-terminal": "#1a1e24",
        "term-border": "#30363d",
        "term-text": "#e6edf3",
        "term-muted": "#8b949e",
        "term-accent": "#58a6ff",
        "term-green": "#3fb950",
        "term-cyan": "#79c0ff",
        "term-yellow": "#d29922",
        "term-red": "#f85149",
        "term-magenta": "#bc8cff",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "ui-monospace", "monospace"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
