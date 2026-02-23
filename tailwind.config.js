/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        mint: 'rgb(var(--mint) / <alpha-value>)',
        coral: 'rgb(var(--coral) / <alpha-value>)',
        sky: 'rgb(var(--sky) / <alpha-value>)',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(7, 10, 21, 0.18)',
        panel: '0 10px 30px rgba(7, 10, 21, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
