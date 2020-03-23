"use strict";

import { isNumber } from "./common";

export function formatSize(size, fixed = 2, showPlus) {
  const symbol = size === Math.abs(size);
  size = Math.abs(size);
  let str = "";
  size = +size;
  if (size / 1024 < 1) {
    str = `${(size).toFixed(fixed)}Bytes`;
  } else if (size / 1024 / 1024 < 1) {
    str = `${(size / 1024).toFixed(fixed)}KB`;
  } else if (size / 1024 / 1024 / 1024 < 1) {
    str = `${(size / 1024 / 1024).toFixed(fixed)}MB`;
  } else {
    str = `${(size / 1024 / 1024 / 1024).toFixed(fixed)}GB`;
  }
  return size ? `${symbol ? `${showPlus ? `+${str}` : str}` : `-${str}`}` : str;
}

export function formatTime(ts, ch) {
  ts = (isNumber(ts) && ts) || 0;
  let str = "";
  ts = Number(ts);
  if (ts < 1e3) {
    str = `${Number(ts.toFixed(2))}${ch ? "毫秒" : "ms"}`;
  } else if (ts < 1e3 * 60) {
    str = `${Number((ts / 1e3).toFixed(2))}${ch ? "秒" : "s"}`;
  } else if (ts < 1e3 * 60 * 60) {
    str = `${Number((ts / (1e3 * 60)).toFixed(2))}${ch ? "分钟" : "min"}`;
  } else if (ts < 1e3 * 60 * 60 * 24) {
    str = `${Number((ts / (1e3 * 60 * 60)).toFixed(2))}${ch ? "小时" : "h"}`;
  } else {
    const day = parseInt(ts / (1e3 * 60 * 60 * 24));
    const remain = ts - day * 1e3 * 60 * 60 * 24;
    str = `${day}${ch ? "天" : "d"}${remain ? ` ${formatTime(remain, ch)}` : ""}`;
  }
  return str;
}