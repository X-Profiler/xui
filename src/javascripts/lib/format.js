"use strict";

import { isNumber } from "@/javascripts/lib/common";

export function formatSize(size, fixed = 2, showPlus, showString = false) {
  const symbol = size === Math.abs(size);
  size = Math.abs(size);
  let str = "";
  size = +size;

  if (size / 1024 < 1) {
    str = `${showString ? size.toFixed(fixed) : Number((size).toFixed(fixed))}Bytes`;
  } else if (size / 1024 / 1024 < 1) {
    str = `${showString ? (size / 1024).toFixed(fixed) : Number((size / 1024).toFixed(fixed))}KB`;
  } else if (size / 1024 / 1024 / 1024 < 1) {
    str = `${showString ? (size / 1024 / 1024).toFixed(fixed) : Number((size / 1024 / 1024).toFixed(fixed))}MB`;
  } else {
    str = `${showString ? (size / 1024 / 1024 / 1024).toFixed(fixed) : (Number(size / 1024 / 1024 / 1024).toFixed(fixed))}GB`;
  }
  return size ? `${symbol ? `${showPlus ? `+${str}` : str}` : `-${str}`}` : str;
}

export function formatTime(ts, ch = false, brief = false, fixed = 2) {
  ts = (isNumber(ts) && ts) || 0;
  let str = "";
  ts = Number(ts);
  if (ts < 1e3) {
    str = `${Number(ts.toFixed(fixed))}${ch ? "毫秒" : "ms"}`;
  } else if (ts < 1e3 * 60) {
    str = `${Number((ts / 1e3).toFixed(fixed))}${ch ? "秒" : "s"}`;
  } else if (ts < 1e3 * 60 * 60) {
    str = `${Number((ts / (1e3 * 60)).toFixed(fixed))}${ch ? "分钟" : brief ? "m" : "min"}`;
  } else if (ts < 1e3 * 60 * 60 * 24) {
    const hour = parseInt(ts / (1e3 * 60 * 60));
    const remain = ts - hour * 1e3 * 60 * 60;
    str = `${hour}${ch ? "小时" : "h"}${remain ? `:${formatTime(remain, ch, brief, fixed)}` : ""}`;
  } else {
    const day = parseInt(ts / (1e3 * 60 * 60 * 24));
    const remain = ts - day * 1e3 * 60 * 60 * 24;
    str = `${day}${ch ? "天" : "d"}${remain ? `:${formatTime(remain, ch, brief, fixed)}` : ""}`;
  }
  return str;
}