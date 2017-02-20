const Path = require('path');
const Webpack = require('webpack');

module.exports = {
  context: Path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: Path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
};