"use strict";

module.exports = {
  publicPath: "/public",
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:7442",
        changeOrigin: true
      },
    }
  }
};
