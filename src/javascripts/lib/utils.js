"use strict";

import { createNamespacedHelpers } from "vuex";
import axios from "axios";
import { tags } from "../config";

const routeCanBackMap = {};
const CancelToken = axios.CancelToken;

let lang = "ch";

export const failedCode = -99999;

export function setLang(lang_) {
  lang = lang_;
}

export function getTag(tags) {
  return tags[lang];
}

// TODO: need remove
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

// TODO: need remove
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

// TODO: need remove
export function handleError(message, loadingKey, err) {
  if (axios.isCancel(err)) {
    return;
  }
  error.call(this, `${message} ${err}`, err.code);
  this[loadingKey] = false;
  throw err;
}

// TODO: need remove
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

// TODO: need remove
export function get(...args) {
  args.unshift("GET");
  return request.call(this, ...args);
}

// TODO: need remove
export function post(...args) {
  args.unshift("POST");
  return request.call(this, ...args);
}

// valid utils
const checkType = {
  array: v => Array.isArray(v)
};

export function createCancelToken() {
  return CancelToken.source();
}

export function cancelRequest(source) {
  source.cancel("Operation canceled by the user.");
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

export function storeFactory(key, value) {
  const loading = `${key}_loading`;
  const error = `${key}_load_error`;
  const finalKey = `${key}_data`;

  const loadingMutation = `set_${loading}_status`;
  const errorMutation = `set_${error}`;
  const keyMutation = `set_${key}`;

  return {
    state: {
      [loading]: false,
      [error]: undefined,
      [finalKey]: value
    },

    mutations: {
      [loadingMutation](state, status) {
        state[loading] = status;
      },

      [errorMutation](state, message) {
        state[error] = message;
      },

      [keyMutation](state, data) {
        state[finalKey] = data;
      }
    },

    async handle({ dispatch, commit }, options, resKey, type) {
      commit(loadingMutation, true);
      commit(errorMutation, undefined);
      try {
        commit(keyMutation, value);
        let data = await dispatch("request", options, { root: true });
        if (resKey) {
          data = data[resKey];
        }
        if (type && typeof checkType[type] === "function") {
          if (checkType[type](data)) {
            commit(keyMutation, data);
          }
        } else {
          commit(keyMutation, data);
        }
      } catch (err) {
        commit(errorMutation, err.message);
      }
      commit(loadingMutation, false);
    }
  };
}

function routeFactory(openName, closeName, ...args) {
  const tag = "YES";

  const [queryKeyName, flag, refKey, setFlag, request, loading, extra = []] = args;

  return {
    handleMounted(name, enable = false, dataKey = false) {
      if (enable) {
        this[name](this.$route.query, dataKey);
      } else {
        this[setFlag]({ status: false });
      }
    },

    mapMethods(name) {
      return {
        [name](query, dataKey) {
          const element = this.$refs[refKey];
          const value = query[this[queryKeyName]];

          if (value === tag) {
            const data = { status: true };
            if (dataKey) {
              data[dataKey] = query;
            }
            this[setFlag](data);
            element[openName]();
            if (request) {
              const extraData = {};
              for (const keyId of extra) {
                extraData[keyId] = this[keyId];
              }
              this[request](Object.assign({
                cancelToken: this.cancelToken.token
              }, extraData));
            }
          } else {
            this[setFlag]({ status: false });
            element[closeName]();
            if (loading && this[loading]) {
              cancelRequest(this.cancelToken);
              this.cancelToken = createCancelToken();
            }
          }
        }
      };
    },

    mapWatch: {
      [flag]() {
        const queryKey = this[queryKeyName];
        if (this[flag]) {
          const route = this.$route;
          if (route.query[queryKey] === tag) {
            return;
          }
          const query = Object.assign({}, route.query, { [queryKey]: tag });
          this.$router.push({ path: route.path, query });
          routeCanBackMap[queryKey] = true;
        } else {
          const route = this.$route;
          if (route.query[queryKey] === tag) {
            if (!routeCanBackMap[queryKey] && this.$store.state.first) {
              this.$store.commit("first", false);
              const query = Object.assign({}, route.query, { [queryKey]: undefined });
              this.$router.push({ path: route.path, query });
            } else {
              this.$router.go(-1);
              routeCanBackMap[queryKey] = false;
            }
          }
        }
      }
    }
  };
}

export function drawerRouteFactory(...args) {
  return routeFactory("open", "close", ...args);
}

export function modalRouteFactory(...args) {
  return routeFactory("showModal", "cancelModal", ...args);
}

function getIndexOrIndex(length) {
  if (length % 2 === 0) {
    return length / 2;
  } else {
    return (length - 1) / 2;
  }
}

export function dichotomy(arr, val) {
  let length = arr.length;

  let before = arr[0];
  let after = arr[arr.length - 1];
  let index = getIndexOrIndex(length);

  while (length > 0) {
    if (val >= arr[index]) {
      if (arr[index] > before) {
        before = arr[index];
      }
      length = getIndexOrIndex(length, false);
      index = index + getIndexOrIndex(length) + 1;
    } else {
      if (arr[index] < after) {
        after = arr[index];
      }

      length = getIndexOrIndex(length, true);
      index = index - (length - getIndexOrIndex(length));
    }
  }

  return [before, after];
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