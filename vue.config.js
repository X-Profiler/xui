"use strict";

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/public" : "/",
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
