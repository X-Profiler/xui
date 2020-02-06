'use strict';

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/xapi': {
        target: 'http://localhost:7442',
        changeOrigin: true
      },
    }
  }
};
