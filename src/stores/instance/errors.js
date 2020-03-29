"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: fileState, mutations: fileMutations, handle: handleFile } =
  utils.storeFactory("files", []);
const { state: errorState, mutations: errorMutations, handle: handleError } =
  utils.storeFactory("logs", { list: [], count: 0 });

export default {
  namespaced: true,

  state: {
    ...fileState,
    ...errorState,

    errorFile: undefined
  },

  mutations: {
    ...fileMutations,
    ...errorMutations,

    setErrorFile(state, file) {
      state.errorFile = file;
    }
  },

  actions: {
    async getErrorFiles(context, { cancelToken }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.errorFiles,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId
        }
      };

      await handleFile(context, options, "list", "array");
    },

    async getErrorLogs(context, { cancelToken, currentPage, pageSize }) {
      const { state, rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.errorLogs,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          errorFile: state.errorFile,
          currentPage,
          pageSize
        }
      };

      await handleError(context, options);
    }
  }
};