"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: fileState, mutations: fileMutations, handle: handleFile } =
  utils.storeFactory("files", []);
const { state: moduleState, mutations: moduleMutations, handle: handleModule } =
  utils.storeFactory("module", {});

export default {
  namespaced: true,

  state: {
    ...fileState,
    ...moduleState,

    moduleFile: undefined,
    riskModules: undefined,
    showDependencies: undefined,

    riskDetailModal: undefined,
    riskModalData: {},
  },

  mutations: {
    ...fileMutations,
    ...moduleMutations,

    setModuleFile(state, file) {
      state.moduleFile = file;
    },

    setShowDependencies(state, status) {
      if (status === true || status === false) {
        state.showDependencies = status;
      }
    },

    setRiskModules(state, riskModules) {
      state.riskModules = riskModules || {};
    },

    setRiskDetailModal(state, { status, riskModalData }) {
      if (status === false || status === true) {
        state.riskDetailModal = status;
      }

      if (riskModalData) {
        state.riskModalData = riskModalData;
      }
    },
  },

  actions: {
    async getModuleFiles(context, { cancelToken }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.moduleFiles,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId
        }
      };

      await handleFile(context, options, "list", "array");
    },

    async getModule(context, { cancelToken }) {
      const { state, rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.module,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          moduleFile: state.moduleFile,
        }
      };

      await handleModule(context, options);
    }
  }
};