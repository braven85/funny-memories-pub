/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fm2-gradient-start': '#fff',
        'fm2-gradient-middle': '#8cecff',
        'fm2-gradient-end': '#bafc91',
        'fm2-chris': '#0000ff',
        'fm2-chris-dark': '#0000c0',
        'fm2-stewie': '#008000',
        'fm2-stewie-dark': '#006900',
        'fm2-meg': '#ba00ba',
        'fm2-meg-dark': '#960096',
      },
    },
  },
  plugins: [],
};
