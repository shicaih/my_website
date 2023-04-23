/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'ubuntu',
      sansB: 'ubuntu-bold',
      sansL: 'ubuntu-light',
      jost: 'jost',
      jostB: 'jost-bold',
      jostL: 'jost-light',
      futura: 'futura-pt',
    },
    extend: {
      colors: {
        greenC: '#848026',
        purpleC: '#441E8A',
      },
      animation: {
        bounceAndPulse: 'bounceAndPulse 1.5s infinite',
      },
      keyframes: {
        bounceAndPulse: {
          '0%, 100%': {
            opacity: 0.5,
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            opacity: 1,
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [],
};
