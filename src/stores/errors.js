"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: fileState, mutations: fileMutations, handle: handleFile } =
  utils.storeFactory("user", {});
const { state: errorState, mutations: errorMutations, handle: handleError } =
  utils.storeFactory("user", {});

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
      const { rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.errorFiles,
        data: {
          appId: rootState.dashboard.appId,
          agentId: rootState.dashboard.instance.agentId
        }
      };

      await handleFile(context, options);
    },

    async getErrorLogs(context, { cancelToken, errorFile, currentPage, pageSize }) {
      const { rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.errorLogs,
        data: {
          appId: rootState.dashboard.appId,
          agentId: rootState.dashboard.instance.agentId,
          errorFile,
          currentPage,
          pageSize
        }
      };

      await handleError(context, options);
    }
  }
};