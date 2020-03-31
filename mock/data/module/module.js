'use strict';

const packageLock = require('../../../package-lock.json');

const data = {
  "dependencies": {
    "axios": "^0.19.2",
    "core-js": "^3.4.4",
    "moment": "^2.24.0",
    "view-design": "^4.1.2",
    "vue": "^2.6.10",
    "vue-dom-portal": "^0.1.6",
    "vue-router": "^3.1.5",
    "vuex": "^3.1.2"
  },

  "devDependencies": {
    "@vue/cli-plugin-babel": "^4.1.0",
    "@vue/cli-plugin-eslint": "^4.1.0",
    "@vue/cli-service": "^4.1.0",
    "babel-eslint": "^10.0.3",
    "body-parser": "^1.19.0",
    "eslint": "^5.16.0",
    "eslint-plugin-vue": "^5.0.0",
    "express": "^4.17.1",
    "less": "^3.10.3",
    "less-loader": "^5.0.0",
    "nodemon": "^2.0.2",
    "vue-template-compiler": "^2.6.10",
    "xprofiler": "^1.2.0"
  }
};

const lockModule = {};
Object.keys(data.dependencies)
  .concat(Object.keys(data.devDependencies))
  .forEach(name => {
    const info = packageLock.dependencies[name] || {};
    lockModule[name] = {
      version: info.version
    }
  });
data.lockModule = lockModule;

module.exports = data;