"use strict";

import { createNamespacedHelpers } from "vuex";
import axios from "axios";
import { tags } from "../config";

const CancelToken = axios.CancelToken;

let lang = "ch";

export const failedCode = -99999;

export function setLang(lang_) {
  lang = lang_;
}

export function getTag(tags) {
  return tags[lang];
}

export function error(content, code, duration) {
  if (Number(code) === 401) {
    location.reload();
    return;
  }
  if (duration) {
    this.$Message.error({ content, duration, closable: true });
  } else {
    this.$Message.error(content);
  }
}

export function resolveData(message, loadingKey, data) {
  data = data.data;
  let res;
  if (data.ok) {
    res = data.data;
  } else {
    error.call(this, data.message || `${message}`, data.code);
    res = failedCode;
  }
  if (loadingKey) {
    this[loadingKey] = false;
  }
  return res;
}

export function handleError(message, loadingKey, err) {
  if (axios.isCancel(err)) {
    return;
  }
  error.call(this, `${message} ${err}`, err.code);
  this[loadingKey] = false;
  throw err;
}

export function createCancelToken() {
  return CancelToken.source();
}

export function cancelRequest(source) {
  source.cancel("Operation canceled by the user.");
}

export function request(method, message, url, data, callback, cancelToken, loadingKey = "") {
  if (loadingKey) {
    this[loadingKey] = true;
  }
  message = message[lang];

  const obj = {};
  if (method === "GET") {
    obj.params = data;
  } else {
    obj.data = data;
  }

  return axios(Object.assign({
    url,
    method,
    cancelToken
  }, obj))
    .then(resolveData.bind(this, message, loadingKey))
    .then(callback)
    .catch(handleError.bind(this, message, loadingKey));
}

export function get(...args) {
  args.unshift("GET");
  return request.call(this, ...args);
}

export function post(...args) {
  args.unshift("POST");
  return request.call(this, ...args);
}

function checkValueSetting(componentKey, setValue, notSetting = false) {
  const whiteList = this.valueWhiteList && this.valueWhiteList[componentKey];
  const shouldDoNext = !setValue || !Array.isArray(whiteList) || whiteList.includes(setValue);
  if (!shouldDoNext) {
    if (!notSetting) {
      error.call(this, getTag(tags.illegalType) + setValue);
    }
    if (Array.isArray(whiteList)) {
      this[componentKey] = whiteList[0];
    }
  } else if (!notSetting) {
    if (setValue) {
      this[componentKey] = setValue;
    } else {
      if (Array.isArray(whiteList)) {
        this[componentKey] = whiteList[0];
      }
    }
  }
  return shouldDoNext;
}

export function watchRoute(args, queryKey, componentKey) {
  const queryValue = args[0].query[queryKey];
  checkValueSetting.call(this, componentKey, queryValue);
}

export function watchQueryKey(queryKey, componentKey, args) {
  const [newVal, oldVal] = args;

  if (!checkValueSetting.call(this, componentKey, newVal)) {
    return;
  }

  const nessaryQueryArgs = this.nessaryQueryArgs || [];
  const query = this.$route.query;
  if (query[queryKey] == newVal) {
    return;
  }

  const $query = { [queryKey]: newVal };
  for (const nessaryArg of nessaryQueryArgs) {
    if (nessaryArg !== queryKey) {
      $query[nessaryArg] = query[nessaryArg];
    }
  }

  const replace = oldVal === undefined || !checkValueSetting.call(this, componentKey, oldVal, true);
  if (replace) {
    this.$router.replace({ path: this.$route.path, query: $query });
  } else {
    this.$router.push({ path: this.$route.path, query: $query });
  }
}

export function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return h;
}

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

export function createNamespace(namespace) {
  return createNamespacedHelpers(namespace);
}