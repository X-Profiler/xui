"use strict";

export function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return h;
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

export function isNumber(num) {
  return num !== true && num !== false && Boolean(num === 0 || (num && !isNaN(num)));
}

export function isBooleanString(bool) {
  return bool === "true" || bool === "false";
}

export function stringToBoolean(bool) {
  return bool === "true";
}

export function getCsrfToken() {
  const cookies = document.cookie.split(";")
    .map(c => c.split("=")
      .map(item => item.trim()));
  const length = cookies.length;
  for (let i = 0; i < length; i++) {
    const [key, value] = cookies[i];
    if (key === "csrfToken") {
      return value;
    }
  }
}

export function htmlEscape(text) {
  if (!text) return "";
  return String(text).replace(/[<>"&]/g, match => {
    switch (match) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "\"": return "&quot;";
    }
  });
}