"use strict";

import axios from "axios";
import { getCsrfToken } from "@/javascripts/lib/utils";

// store modules
import url from "@/stores/common/url";
import i18n from "@/stores/common/i18n";
import user from "@/stores/user";
import consoler from "@/stores/consoler";
import dashboard from "@/stores/dashboard";
import instance from "@/stores/instance/instance";
import process from "@/stores/instance/process";
import system from "@/stores/instance/system";
import errors from "@/stores/instance/errors";
import modules from "@/stores/instance/modules";
import file from "@/stores/file/file";
import wrapper from "@/stores/file/wrapper";
import analytics from "@/stores/analytics/analytics";
import diag from "@/stores/analytics/diag";
import gc from "@/stores/analytics/gc";
import team from "@/stores/team/team";
import alarm from "@/stores/alarm/alarm";
import contact from "@/stores/alarm/contact";
import history from "@/stores/alarm/history";
import settings from "@/stores/setting/settings";

export default {
  state: {
    ...url,
    ...i18n,
    globalError: undefined,
    first: true
  },

  getters: {
    appId(state) {
      return state.dashboard.appId;
    },

    agentId(state) {
      return state.dashboard.instance.agentId;
    }
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
    async request({ commit }, { url, method = "GET", cancelToken, data = {}, globalError = false, rawData = false }) {
      if (!cancelToken) {
        throw new Error("cancel token should be passed in!");
      }

      const obj = {};
      if (method === "GET") {
        obj.params = data;
      } else {
        obj.data = data;
      }

      if (method !== "GET") {
        obj.headers = {
          "x-csrf-token": getCsrfToken()
        };
      }

      try {
        const res = await axios(Object.assign({
          url,
          method,
          cancelToken
        }, obj));

        const data = res.data;
        if (rawData) {
          return data;
        }

        if (!data.ok) {
          throw new Error(data.message || "unknown inner server error");
        }
        return data.data || {};
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

    "dashboard": {  // dashboard
      ...dashboard,

      modules: {
        "instance": { // dashboard/instance
          ...instance,

          modules: {
            "process": { ...process }, // dashboard/instance/process

            "system": { ...system }, // dashboard/instance/system

            "errors": { ...errors }, // dashboard/instance/errors

            "modules": { ...modules } // dashboard/instance/modules
          }
        },

        "file": { // dashboard/file
          ...file,

          modules: {
            "wrapper": { ...wrapper }  // dashboard/file/wrapper
          }
        },

        "team": { // dashboard/team
          ...team
        },

        "alarm": { // dashboard/alarm
          ...alarm,

          modules: {
            "contact": { ...contact }, // dashboard/alarm/contact
            "history": { ...history }, // dashboard/alarm/history
          }
        },

        "settings": { // dashboard/settings
          ...settings
        },

        "analytics": { // dashboard/analytics
          ...analytics,

          modules: {
            "diag": { ...diag }, // dashboard/analytics/diag
            "gc": { ...gc } // dashboard/analytics/gc
          }
        }
      }
    }
  }
};