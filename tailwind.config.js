module.exports = {
  purge: ['./src/index.html', './src/js/**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        screen: {
          default: '#255808',
          dim: '#3A7B16',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['dark'],
    },
  },
  plugins: [],
};
