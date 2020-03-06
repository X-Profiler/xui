"use strict";

import axios from "axios";

// store modules
import url from "@/stores/url";
import i18n from "@/stores/i18n";
import dashboard from "@/stores/dashboard";
import instance from "@/stores/instance";
import process from "@/stores/process";

export default {
  state: {
    ...url,
    ...i18n,
    globalError: undefined
  },

  mutations: {
    updateGlobalError(state, err) {
      state.globalError = err;
    }
  },

  actions: {
    async request({ commit }, { url, method = "GET", cancelToken, data = {}, disableGlobalError = false }) {
      const obj = {};
      if (method === "GET") {
        obj.params = data;
      } else {
        obj.data = data;
      }

      try {
        const res = await axios(Object.assign({
          url,
          method,
          cancelToken
        }, obj));

        const data = res.data;
        if (!data.ok) {
          throw new Error(data.message || 'unknown inner server error')
        }
        return data.data;
      } catch (err) {
        if (disableGlobalError) {
          throw err;
        } else {
          commit("updateGlobalError", err);
        }
      }
    }
  },

  modules: {
    "dashboard": {  // "dashboard"
      ...dashboard,

      modules: {
        "instance": { // "dashboard/instance"
          ...instance,

          modules: {
            "process": { // "dashboard/instance/instance"
              ...process
            }
          }
        }
      }
    }
  }
};