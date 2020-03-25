"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: fileState, mutations: fileMutations, handle: handleFile } =
  utils.storeFactory("files", []);
const { state: errorState, mutations: errorMutations, handle: handleError } =
  utils.storeFactory("logs", []);

export default {
  namespaced: true,

  state: {
    ...fileState,
    ...errorState
  },

  mutations: {
    ...fileMutations,
    ...errorMutations
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

    async getErrorLogs(context, { cancelToken, errorFile, currentPage, pageSize }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.errorLogs,
        data: {
          appId: rootGetters.appId,
          agentId: rootGetters.agentId,
          errorFile,
          currentPage,
          pageSize
        }
      };

      await handleError(context, options, "list", "array");
    }
  }
};