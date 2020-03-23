"use strict";

const requestQueue = {};

const checkType = {
  array: v => Array.isArray(v)
};

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
      if (!requestQueue[loadingMutation]) {
        requestQueue[loadingMutation] = 1;
      } else {
        requestQueue[loadingMutation]++;
      }
      commit(keyMutation, value);
      commit(loadingMutation, true);
      commit(errorMutation, undefined);
      try {
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
      requestQueue[loadingMutation]--;
      if (!requestQueue[loadingMutation]) {
        commit(loadingMutation, false);
      }
    }
  };
}