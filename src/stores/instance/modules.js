"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: fileState, mutations: fileMutations, handle: handleFile } =
  utils.storeFactory("files", []);
const { state: moduleState, mutations: moduleMutations, handle: handleModule } =
  utils.storeFactory("modules", []);

export default {
  namespaced: true,

  state: {
    ...fileState,
    ...moduleState,

    moduleFile: undefined
  },

  mutations: {
    ...fileMutations,
    ...moduleMutations,

    setModuleFile(state, file) {
      state.moduleFile = file;
    }
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

    async getModules(context, { cancelToken }) {
      const { state, rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.modules,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          moduleFile: state.moduleFile,
        }
      };

      await handleModule(context, options, "list", "array");
    }
  }
};