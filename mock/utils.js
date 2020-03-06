'use strict';

exports.checkParam = function (obj, keys) {
  for (const key of keys) {
    if (!obj[key]) {
      throw new Error(`${key} should be passed in!`);
    }
  }
};