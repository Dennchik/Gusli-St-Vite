module.exports = {
  plugins: {
    autoprefixer: {
      cascade: false,
      grid: 'auto-place',
      overrideBrowserslist: [
        'last 3 versions',
        '> 0.5%',
        'not ie <= 11',
        'not ie_mob <= 11',
      ],
    },
  },
};
