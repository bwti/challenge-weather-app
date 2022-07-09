module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-styled-components'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
