/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  safelist: [
    '-top-1',
    'left-3',
    'text-sm',
    'opacity-100',
    'bg-secondary',
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
