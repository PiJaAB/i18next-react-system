// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-flow',
      '@babel/preset-env',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            src: './src',
          },
        },
      ],
    ],
  };
};
