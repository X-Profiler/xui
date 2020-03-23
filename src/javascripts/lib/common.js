"use strict";

export function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return h;
}

export function isNumber(num) {
  return Boolean(num === 0 || (num && !isNaN(num)));
}

export function createLaterFunction(name, callback, wait = 4) {
  const timerKey = Symbol("TIMER_KEY");
  return {
    [name]: function (...args) {
      if (this[timerKey]) {
        clearTimeout(this[timerKey]);
        this[timerKey] = null;
      }

      this[timerKey] = setTimeout(() => {
        this[timerKey] = null;
        callback.call(this, ...args);
      }, wait);
    }
  };
}