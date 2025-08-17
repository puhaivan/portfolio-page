/* eslint-env node */
/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      // Targets when parent has .dark
      addVariant('dark-child', '.dark &');

      // Targets when parent has .immersive
      addVariant('immersive', '.immersive &');
    }),
  ],
};
