"use strict";

import axios from "axios";

// store modules
import url from "@/stores/url";
import i18n from "@/stores/i18n";
import user from "@/stores/user";
import consoler from "@/stores/consoler";
import dashboard from "@/stores/dashboard";
import instance from "@/stores/instance";
import process from "@/stores/process";
import system from "@/stores/system";
import errors from "@/stores/errors";

export default {
  state: {
    ...url,
    ...i18n,
    globalError: undefined,
    first: true
  },

  mutations: {
    updateGlobalError(state, err) {
      state.globalError = err;
    },

    first(state, value) {
      state.first = value;
    }
  },

  actions: {
    async request({ commit }, { url, method = "GET", cancelToken, data = {}, globalError = false }) {
      if (!cancelToken) {
        throw new Error("cancel token should be passed in!");
      }

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
          throw new Error(data.message || "unknown inner server error");
        }
        return data.data;
      } catch (err) {
        if (axios.isCancel(err)) {
          return {};
        }

        if (globalError) {
          commit("updateGlobalError", err);
        } else {
          throw err;
        }
      }
    }
  },

  modules: {
    "user": { ...user }, // user

    "consoler": { ...consoler }, // consoler

    "dashboard": {  // "dashboard"
      ...dashboard,

      modules: {
        "instance": { // "dashboard/instance"
          ...instance,

          modules: {
            "process": { ...process }, // "dashboard/instance/process",

            "system": { ...system }, // "dashboard/instance/system"

            "errors": { ...errors } // "dashboard/instance/errors"
          }
        }
      }
    }
  }
};