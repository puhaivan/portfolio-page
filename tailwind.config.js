/* eslint-env node */
/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [
    plugin(({ addVariant }) => {
      // example custom variant
      addVariant('dark-child', '.dark &');
    }),
  ],
};
