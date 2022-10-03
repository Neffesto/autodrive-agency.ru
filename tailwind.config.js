/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue, js}"
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '744px',
      lg: '1440px',
    },
    extend: {
      colors: {
        'dark-blue': '#3B82F6',
        'blue-green': '#0D9488',
        'pearl-blackberry':'#6B7280',
        'dark-purple-blue':'#111827',
        'dark-spring-green':'#16A34A',
      },
    },
  },
  plugins: [],
}
